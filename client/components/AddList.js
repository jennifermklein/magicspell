import React from "react";
import { Button } from "react-rainbow-components";
import { ButtonIcon } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const AddList = ({ addList }) => {
  return (
    <button id="add-list" onClick={addList}>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
};
