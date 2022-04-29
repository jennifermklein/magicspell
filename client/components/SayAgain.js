import React from "react";
import { Button } from "react-rainbow-components";
import { ButtonIcon } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export const SayAgain = ({ sayAgain, listId }) => {
  return (
    <button id="play-again" onClick={(e) => sayAgain(e, listId)}>
      <FontAwesomeIcon icon={faPlay} />
    </button>
  );
};
