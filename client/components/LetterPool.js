import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";

export const LetterPool = ({ listId, ITEMS }) => {
  return (
    <Droppable
      direction="horizontal"
      droppableId={listId}
      isCombineEnabled={false}
      isDropDisabled={true}
      ITEMS={ITEMS}
    >
      {(provided, snapshot) => (
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
                    className={`item ${snapshot.isDragging ? "dragging" : ""}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    // isDragging={snapshot.isDragging}
                    style={provided.draggableProps.style}
                  >
                    {item.content}
                  </div>
                  {snapshot.isDragging && (
                    <div className="item clone">{item.content}</div>
                  )}
                </React.Fragment>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
