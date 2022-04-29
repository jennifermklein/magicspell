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
// import { RemoveList } from "./RemoveList";
import { reorder, copy, move, remove } from "../helpers/ordering";
import { ITEMS } from "../helpers/data";
import { getAudioThunk } from "../helpers/thunks";

class Main extends Component {
  state = {
    [uuid()]: [],
  };

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      if (source.droppableId !== "ITEMS") {
        this.setState(
          {
            [source.droppableId]: remove(
              this.state[source.droppableId],
              source.index
            ),
          },
          () => this.getWord(source)
        );
      }
      return;
    }

    // if (destination.droppableId === "GARBAGE") {
    //   this.setState(
    //     {
    //       [source.droppableId]: remove(
    //         this.state[source.droppableId],
    //         source.index
    //       ),
    //     },
    //     () => this.getWord(source)
    //   );
    //   return;
    // }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState(
          {
            [destination.droppableId]: reorder(
              this.state[source.droppableId],
              source.index,
              destination.index
            ),
          },
          () => this.getWord(destination.droppableId)
        );
        break;
      case "ITEMS":
        this.setState(
          {
            [destination.droppableId]: copy(
              ITEMS,
              this.state[destination.droppableId],
              source,
              destination
            ),
          },
          () => this.getWord(destination.droppableId)
        );
        break;
      default:
        this.setState(
          move(
            this.state[source.droppableId],
            this.state[destination.droppableId],
            source,
            destination
          ),
          () => this.getWord(destination.droppableId)
        );
        break;
    }
  };

  getWord = (evt, destination) => {
    const destinationId = destination || evt;
    const word = this.state[destinationId].reduce(
      (accum, item) => accum + item.content,
      ""
    );
    console.log(word);
    this.props.getAudio(word);
  };

  addList = (e) => {
    this.setState({ [uuid()]: [] });
  };

  //   removeList = (e, list) => {
  //     console.log("STATE:", this.state);
  //     let state = { ...this.state };
  //     delete state[list];
  //     console.log("NEW STATE:", state);
  //     this.setState(state, () => console.log(this.state));
  //   };

  render() {
    const lists = Object.keys(this.state);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="list-container">
          <LetterPool listId="ITEMS" ITEMS={ITEMS} />
          {lists.map((list, i) => {
            return (
              <div key={list}>
                <LetterList listId={list} letters={this.state[list]} />
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
