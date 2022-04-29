import React from "react";

export const RemoveList = ({ removeList, listId }) => {
  return <button onClick={(e) => removeList(e, listId)}>X</button>;
};
