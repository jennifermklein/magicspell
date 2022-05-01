import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import { getStyle } from "../helpers/style";

export const DraggableLetter = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <React.Fragment>
          <div
            className={`item ${snapshot.isDragging ? "dragging" : ""}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getStyle(provided.draggableProps.style, snapshot)}
            // style={provided.draggableProps.style}
          >
            {item.content}
          </div>
          {snapshot.isDragging && (
            <div className="item clone">{item.content}</div>
          )}
        </React.Fragment>
      )}
    </Draggable>
  );
};
