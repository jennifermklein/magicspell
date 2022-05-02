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
          <a id="logo" href="https://magic-spell-game.herokuapp.com/">
            <img src="/magicspell-V1.png" alt="rainbow logo" />
          </a>
          <p>A modern spell and say game</p>
          <div>
            {ITEMS.map((item, index) =>
              index <= ITEMS.length / 2 ? (
                <DraggableLetter item={item} index={index} key={item.id} />
              ) : null
            )}
          </div>
          <div>
            {ITEMS.map((item, index) =>
              index > ITEMS.length / 2 ? (
                <DraggableLetter item={item} index={index} key={item.id} />
              ) : null
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
