import React from "react";
import { Menu } from "../index";

const VerticalList = props => (
  <Menu pointing vertical>
    {props.categories.map(categorie => {
      return (
        <Menu.Item
          key={categorie.id}
          id={categorie.id}
          name={categorie.name}
          active={props.activeItem.name === categorie.name}
          onClick={props.onHandleItem}
        />
      );
    })}
  </Menu>
);

export default VerticalList;
