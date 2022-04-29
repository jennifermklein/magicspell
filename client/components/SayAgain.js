import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";

export const SayAgain = ({ sayAgain, listId }) => {
  return (
    <button id="play-again" onClick={(e) => sayAgain(e, listId)}>
      <FontAwesomeIcon icon={faMagicWandSparkles} />
    </button>
  );
};
