import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { LetterList } from "./LetterList";
import { LetterPool } from "./LetterPool";
import { AddList } from "./AddList";
// import { Welcome } from "./Welcome";
import { SayAgain } from "./SayAgain";
import { RemoveList } from "./RemoveList";
import { reorder, copy, move, remove } from "../helpers/ordering";
import { ITEMS } from "../helpers/data";
import { getAudioThunk } from "../helpers/thunks";
// import logo from "../../public/icons/magicspell-V1.png";
// import logo from "./magicspell-V1.png";

class Main extends Component {
  state = {
    lists: { [uuid()]: [] },
  };

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      if (source.droppableId !== "ITEMS") {
        this.setState(
          {
            lists: {
              ...this.state.lists,
              [source.droppableId]: remove(
                this.state.lists[source.droppableId],
                source.index
              ),
            },
          },
          () => this.getWord(source.droppableId)
        );
      }
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState(
          {
            lists: {
              ...this.state.lists,
              [destination.droppableId]: reorder(
                this.state.lists[source.droppableId],
                source.index,
                destination.index
              ),
            },
          },
          () => this.getWord(destination.droppableId)
        );
        break;
      case "ITEMS":
        this.setState(
          {
            lists: {
              ...this.state.lists,
              [destination.droppableId]: copy(
                ITEMS,
                this.state.lists[destination.droppableId],
                source,
                destination
              ),
            },
          },
          () => this.getWord(destination.droppableId)
        );
        break;
      default:
        const result = move(
          this.state.lists[source.droppableId],
          this.state.lists[destination.droppableId],
          source,
          destination
        );

        this.setState(
          {
            lists: {
              ...this.state.lists,
              [source.droppableId]: result[source.droppableId],
              [destination.droppableId]: result[destination.droppableId],
            },
          },
          () => this.getWord(destination.droppableId)
        );
        break;
    }
  };

  getWord = (evt, destination) => {
    const destinationId = destination || evt;
    const word = this.state.lists[destinationId].reduce(
      (accum, item) => accum + item.content,
      ""
    );
    console.log(word);
    this.props.getAudio(word);
  };

  addList = (e) => {
    this.setState({ lists: { ...this.state.lists, [uuid()]: [] } });
  };

  removeList = (e, list) => {
    let newState = { ...this.state };
    delete newState.lists[list];
    this.setState(newState);
  };

  render() {
    const lists = Object.keys(this.state.lists);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="list-container">
          <img src="/magicspell-V1.png" alt="rainbow logo" />
          <LetterPool listId="ITEMS" ITEMS={ITEMS} />
          {lists.map((list, i) => {
            return (
              <div key={list} className="container">
                <RemoveList listId={list} removeList={this.removeList} />
                <LetterList listId={list} letters={this.state.lists[list]} />
                <SayAgain listId={list} sayAgain={this.getWord} />
              </div>
            );
          })}
          <AddList addList={this.addList} />
        </div>
      </DragDropContext>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAudio: (word) => dispatch(getAudioThunk(word)),
  };
};

export default connect(null, mapDispatch)(Main);
