import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

export const RemoveList = ({ removeList, listId }) => {
  return (
    <button id="remove-list" onClick={(e) => removeList(e, listId)}>
      <FontAwesomeIcon icon={faMinus} />
    </button>
  );
};
