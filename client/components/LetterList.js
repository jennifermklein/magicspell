import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";

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
          className="letter-list"
          ref={dropProvided.innerRef}
        >
          {letters.map((letter, index) => (
            <Draggable
              key={letter.id}
              draggableId={letter.id}
              index={index}
              className="word"
            >
              {(dragProvided) => (
                <div
                  {...dragProvided.dragHandleProps}
                  {...dragProvided.draggableProps}
                  ref={dragProvided.innerRef}
                >
                  <div>{letter.content}</div>
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
