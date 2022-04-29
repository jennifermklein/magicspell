import React from "react";

export const RemoveList = ({ removeList, list }) => {
  return <button onClick={(e) => removeList(e, list)}>X</button>;
};
