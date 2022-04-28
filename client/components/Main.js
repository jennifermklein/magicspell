import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { LetterList } from "./LetterList";
import { LetterPool } from "./LetterPool";
import { reorder, copy, move } from "../helpers/ordering";
import { ITEMS } from "../helpers/data";

class Main extends Component {
  state = {
    [uuid()]: [],
    [uuid()]: [],
  };

  getWord = (destination) => {
    const word = this.state[destination.droppableId].reduce(
      (accum, item) => accum + item.content,
      ""
    );
    console.log(word);
  };

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          [destination.droppableId]: reorder(
            this.state[source.droppableId],
            source.index,
            destination.index
          ),
        });
        break;
      case "ITEMS":
        this.setState({
          [destination.droppableId]: copy(
            ITEMS,
            this.state[destination.droppableId],
            source,
            destination
          ),
        });
        break;
      default:
        this.setState(
          move(
            this.state[source.droppableId],
            this.state[destination.droppableId],
            source,
            destination
          )
        );
        break;
    }
    this.getWord(destination);
  };

  //   addList = (e) => {
  //     this.setState({ [uuid()]: [] });
  //   };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <LetterPool listId="ITEMS" ITEMS={ITEMS} />
        <div>
          {/* <div onClick={this.addList}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              />
            </svg>
            <div>Add List</div>
          </div> */}
          {Object.keys(this.state).map((list, i) => {
            return (
              <LetterList key={list} listId={list} letters={this.state[list]} />
            );
          })}
        </div>
      </DragDropContext>
    );
  }
}

export default Main;
