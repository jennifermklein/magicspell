import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "react-rainbow-components";

export const Garbage = () => {
  return (
    <Droppable
      droppableId="GARBAGE"
      direction="horizontal"
      isCombineEnabled={false}
    >
      {(dropProvided) => (
        <div
          {...dropProvided.droppableProps}
          id="garbage"
          ref={dropProvided.innerRef}
        >
          {dropProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
