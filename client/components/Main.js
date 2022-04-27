import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import reorderLetters from "../helpers/reorder";
import { LetterList } from "./LetterList";

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const Main = () => {
  const [letters, setLetters] = React.useState({
    1: alphabet, // where letters come from
    2: [],
    // pen: alphabet.map((letter) => letter.toLowerCase()), // where letters go to
  });

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        console.log(source, destination);
        // dropped outside the list
        if (!destination) {
          return;
        }
        setLetters(reorderLetters(letters, source, destination));
      }}
    >
      <div>
        {Object.entries(letters).map(([list, letter]) => (
          <LetterList
            internalScroll
            key={list}
            letters={letter} // ?
            listId={list}
            listType="CARD"
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Main;
