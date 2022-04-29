import React from "react";
import { Button } from "react-rainbow-components";
import { ButtonIcon } from "react-rainbow-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export const SayAgain = ({ sayAgain, listId }) => {
  return (
    <div className="rainbow-p-right_large">
      <ButtonIcon
        variant="neutral"
        icon={
          <FontAwesomeIcon icon={faStar} onClick={(e) => sayAgain(e, listId)} />
        }
      />
    </div>
  );
};

{
  /* <Button
className="rainbow-m-around_medium"
label="SAY"
variant="success"
onClick={(e) => sayAgain(e, listId)}
size="small"
/> */
}
