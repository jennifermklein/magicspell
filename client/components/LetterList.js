import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import { getStyle } from "../helpers/style";

export const LetterList = ({ listId, letters }) => {
  return (
    <Droppable
      droppableId={listId}
      direction="horizontal"
      isCombineEnabled={false}
    >
      {(dropProvided) => (
        <div
          {...dropProvided.droppableProps}
          className="letter-list word"
          ref={dropProvided.innerRef}
        >
          {letters.map((letter, index) => (
            <Draggable key={letter.id} draggableId={letter.id} index={index}>
              {(dragProvided, snapshot) => (
                <div
                  {...dragProvided.dragHandleProps}
                  {...dragProvided.draggableProps}
                  ref={dragProvided.innerRef}
                  style={getStyle(dragProvided.draggableProps.style, snapshot)}
                  className="letter"
                >
                  {letter.content}
                </div>
              )}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
