import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { LetterList } from "./LetterList";
import { reorder, copy, move } from "../helpers/ordering";

const ITEMS = [
  {
    id: uuid(),
    content: "A",
  },
  {
    id: uuid(),
    content: "B",
  },
  {
    id: uuid(),
    content: "C",
  },
  {
    id: uuid(),
    content: "D",
  },
  {
    id: uuid(),
    content: "E",
  },
  {
    id: uuid(),
    content: "F",
  },
  {
    id: uuid(),
    content: "G",
  },
  {
    id: uuid(),
    content: "H",
  },
  {
    id: uuid(),
    content: "I",
  },
  {
    id: uuid(),
    content: "J",
  },
  {
    id: uuid(),
    content: "K",
  },
  {
    id: uuid(),
    content: "L",
  },
  {
    id: uuid(),
    content: "M",
  },
  {
    id: uuid(),
    content: "N",
  },
  {
    id: uuid(),
    content: "O",
  },
  {
    id: uuid(),
    content: "P",
  },
  {
    id: uuid(),
    content: "Q",
  },
  {
    id: uuid(),
    content: "R",
  },
  {
    id: uuid(),
    content: "S",
  },
  {
    id: uuid(),
    content: "T",
  },
  {
    id: uuid(),
    content: "U",
  },
  {
    id: uuid(),
    content: "V",
  },
  {
    id: uuid(),
    content: "W",
  },
  {
    id: uuid(),
    content: "X",
  },
  {
    id: uuid(),
    content: "Y",
  },
  {
    id: uuid(),
    content: "Z",
  },
];

class Main extends Component {
  state = {
    [uuid()]: [],
    [uuid()]: [],
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
  };

  //   addList = (e) => {
  //     this.setState({ [uuid()]: [] });
  //   };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="ITEMS"
          isDropDisabled={true}
          direction="horizontal"
          isCombineEnabled={false}
        >
          {(provided, snapshot) => (
            <div className="list-container">
              <div
                ref={provided.innerRef}
                className="letter-list"
                // isDraggingOver={snapshot.isDraggingOver}
              >
                {ITEMS.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          // isDragging={snapshot.isDragging}
                          style={provided.draggableProps.style}
                        >
                          {item.content}
                        </div>
                        {snapshot.isDragging && <div>{item.content}</div>}
                      </React.Fragment>
                    )}
                  </Draggable>
                ))}
              </div>
            </div>
          )}
        </Droppable>
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
