import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";

export const LetterPool = ({ listId, ITEMS }) => {
  return (
    <Droppable
      droppableId={listId}
      isDropDisabled={true}
      direction="horizontal"
      isCombineEnabled={false}
      ITEMS={ITEMS}
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
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
