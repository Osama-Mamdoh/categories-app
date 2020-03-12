import React from "react";
import { Table } from "../index";

const RedTable = props => (
  <Table color="red" celled selectable padded>
    <Table.Header>
      <Table.Row>{props.onCreateHeader}</Table.Row>
    </Table.Header>
    <Table.Body>{props.onCreateTable}</Table.Body>
  </Table>
);

export default RedTable;
