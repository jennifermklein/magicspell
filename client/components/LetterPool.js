import React from "react";
import { Droppable, Draggable, DroppableProvided } from "react-beautiful-dnd";
import { getStyle } from "../helpers/style";
import { DraggableLetter } from "./DraggableLetter";

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
        <div ref={provided.innerRef} className="letter-list" id="pool">
          <div>
            {ITEMS.map((item, index) =>
              index <= ITEMS.length / 2 ? (
                <DraggableLetter item={item} index={index} />
              ) : null
            )}
          </div>
          <div>
            {ITEMS.map((item, index) =>
              index > ITEMS.length / 2 ? (
                <DraggableLetter item={item} index={index} />
              ) : null
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
