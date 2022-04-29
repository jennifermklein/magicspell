import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { LetterList } from "./LetterList";
import { LetterPool } from "./LetterPool";
import { AddList } from "./AddList";
import { Welcome } from "./Welcome";
// import { SayAgain } from "./SayAgain";
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
          () => this.getWord(destination)
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
          () => this.getWord(destination)
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
          () => this.getWord(destination)
        );
        break;
    }
  };

  getWord = (destination) => {
    const word = this.state[destination.droppableId].reduce(
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
    return (
      <React.Fragment>
        {/* <Welcome /> */}
        <div className="list-container">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <LetterPool listId="ITEMS" ITEMS={ITEMS} />
            {Object.keys(this.state).map((list, i) => {
              return (
                <LetterList
                  key={list}
                  listId={list}
                  letters={this.state[list]}
                />
              );
            })}
            <AddList addList={this.addList} />
          </DragDropContext>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAudio: (word) => dispatch(getAudioThunk(word)),
  };
};

export default connect(null, mapDispatch)(Main);
