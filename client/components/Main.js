import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { LetterList } from "./LetterList";
import { LetterPool } from "./LetterPool";
import { AddList } from "./AddList";
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

  addList = (e) => {
    this.setState({ [uuid()]: [] });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <LetterPool listId="ITEMS" ITEMS={ITEMS} />
        <AddList addList={this.addList} />
        {Object.keys(this.state).map((list, i) => {
          return (
            <LetterList key={list} listId={list} letters={this.state[list]} />
          );
        })}
      </DragDropContext>
    );
  }
}

export default Main;
