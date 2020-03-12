import React, { useContext } from "react";
import CatContext from "../Providers/CatContext";
import { Button } from "../index";

const DeleteButton = props => {
  const category = useContext(CatContext);
  return (
    <Button
      color="red"
      catId={props.catId}
      itemId={props.itemId}
      onClick={event => {
        category.updateData(event.target);
      }}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
