import React from "react";

export const SayAgain = ({ sayAgain, listId }) => {
  return <button onClick={(e) => sayAgain(e, listId)}>Say Again</button>;
};
