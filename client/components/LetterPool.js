import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import { getStyle } from "../helpers/style";

export const LetterPool = ({ listId, ITEMS }) => {
  return (
    <Droppable
      direction="horizontal"
      droppableId={listId}
      isCombineEnabled={false}
      isDropDisabled={true}
      ITEMS={ITEMS}
      renderClone={(provided, snapshot, rubric) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="clone"
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          {ITEMS[rubric.source.index].content}
        </div>
      )}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className="letter-list"
          id="pool"
          // isDraggingOver={snapshot.isDraggingOver}
        >
          {ITEMS.map((item, index) => (
            <div
              className={`item ${snapshot.isDragging ? "dragging" : ""} ${
                item.content === " " ? "space" : ""
              }`}
              key={item.id}
            >
              {item.content}
              <Draggable draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <React.Fragment>
                    <div
                      className={`draggable ${
                        item.content === " " ? "space" : ""
                      }`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // isDragging={snapshot.isDragging}
                      style={provided.draggableProps.style}
                    >
                      {/* {item.content} */}
                    </div>
                  </React.Fragment>
                )}
              </Draggable>
            </div>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
