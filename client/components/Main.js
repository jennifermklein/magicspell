import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { LetterList } from "./LetterList";
import { LetterPool } from "./LetterPool";
import { AddList } from "./AddList";
// import { Garbage } from "./Garbage";
// import { Welcome } from "./Welcome";
import { SayAgain } from "./SayAgain";
import { RemoveList } from "./RemoveList";
import { reorder, copy, move, remove } from "../helpers/ordering";
import { ITEMS } from "../helpers/data";
import { getAudioThunk } from "../helpers/thunks";

class Main extends Component {
  // state = {
  //   [uuid()]: [],
  // };
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

    // if (destination.droppableId === "GARBAGE") {
    //   this.setState({lists:
    //     {...this.state.lists,
    //       [source.droppableId]: remove(
    //         this.state.lists[source.droppableId],
    //         source.index
    //       ),
    //     }},
    //     () => this.getWord(source)
    //   );
    //   return;
    // }

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
        console.log("RESULT", result);
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
    console.log(list);
    console.log("STATE:", this.state);
    let newState = { ...this.state };
    console.log(newState);
    delete newState[list];
    console.log("NEW STATE:", newState);
    // const { list } = this.state;

    this.setState(newState, () => console.log(this.state));
  };

  render() {
    // const lists = Object.keys(this.state);
    const lists = Object.keys(this.state.lists);
    console.log(lists);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="list-container">
          <LetterPool listId="ITEMS" ITEMS={ITEMS} />
          {lists.map((list, i) => {
            return (
              <div key={list} className="container">
                <LetterList listId={list} letters={this.state.lists[list]} />
                <SayAgain listId={list} sayAgain={this.getWord} />
                <RemoveList listId={list} removeList={this.removeList} />
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
