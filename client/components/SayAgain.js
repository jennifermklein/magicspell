import React from "react";

export const SayAgain = ({ sayAgain, list }) => {
  return <button onClick={(e) => sayAgain(e, list)}>Say Again</button>;
};
