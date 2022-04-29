import React from "react";
import { Button } from "react-rainbow-components";

export const AddList = ({ addList }) => {
  return (
    <Button
      className="rainbow-m-around_medium"
      label="+"
      variant="success"
      onClick={addList}
      size="small"
    />
  );
};
