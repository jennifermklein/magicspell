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
      renderClone={(provided, snapshot, rubric) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="clone"
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
            >
              {item.content}
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <React.Fragment>
                    <div
                      className="draggable"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // isDragging={snapshot.isDragging}
                      style={provided.draggableProps.style}
                    >
                      {item.content}
                    </div>
                    {snapshot.isDragging && (
                      <div className="item">{item.content}</div>
                    )}
                    {provided.placeholder}
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
