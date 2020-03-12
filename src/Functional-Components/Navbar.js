import React from "react";
import { Menu, Segment, Button } from "../index";

const Navbar = props => (
  <Segment inverted style={{ borderRadius: 0 }}>
    <Menu inverted>
      <Menu.Item>
        <h3>{props.user}</h3>
      </Menu.Item>
      <Menu.Item position="right">
        <Button inverted onClick={props.onLogout}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  </Segment>
);

export default Navbar;
