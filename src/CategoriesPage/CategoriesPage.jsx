import React, { Fragment } from "react";
import { Container, Grid, Menu, Table, Form, Button, Message } from "../index";
import data from "../data.json";
import { history } from "../Helpers";
import { authenticationService } from "../Services";
import Navbar from "../Functional-Components/Navbar";
import VerticalList from "../Functional-Components/VerticalList";
import RedTable from "../Functional-Components/RedTable";
import DeleteButton from "../Functional-Components/DeleteButton";
import CatContext from "../Providers/CatContext";

class CategoriesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.user.currentUser,
      isAdmin: props.user.isAdmin,
      activeItem: data.categories[0],
      newCategory: { name: "", description: "" }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleItemClick = (e, { name, id }) => {
    this.setState({ activeItem: { id: id, name: name } });
  };

  createHeader = categories => {
    let header = [];
    if (this.state.activeItem.id) {
      let headerItems = Object.keys(
        categories.find(x => x.id === this.state.activeItem.id).items[0]
      ).filter(item => item !== "id");
      headerItems.forEach((element, index) =>
        header.push(
          <Table.HeaderCell key={index}>
            {element.charAt(0).toUpperCase() + element.slice(1)}
          </Table.HeaderCell>
        )
      );
      if (this.state.isAdmin) {
        header.push(
          <Table.HeaderCell key={headerItems.length}>
            {"Actions"}
          </Table.HeaderCell>
        );
      }
    }
    return header;
  };

  createTable = categories => {
    let table = [];
    if (this.state.activeItem.id) {
      let tableData = categories.find(x => x.id === this.state.activeItem.id)
        .items;
      let headerData = Object.keys(tableData[0]).filter(item => item !== "id");
      for (let i = 0; i < tableData.length; i++) {
        let children = [];
        for (let j = 0; j < headerData.length; j++) {
          children.push(
            <Table.Cell key={j}>{tableData[i][headerData[j]]}</Table.Cell>
          );
        }
        if (this.state.isAdmin) {
          children.push(
            <Table.Cell key={headerData.length}>
              <DeleteButton
                catId={this.state.activeItem.id}
                itemId={tableData[i].id}
              ></DeleteButton>
            </Table.Cell>
          );
        }
        table.push(<Table.Row key={tableData[i].id} children={children} />);
      }
    }
    return table;
  };

  logout() {
    authenticationService.logout();
    history.push("/login");
  }

  handleChange(event) {
    if (event.target.name === "name") {
      this.setState({
        newCategory: {
          description: this.state.newCategory.description,
          name: event.target.value
        }
      });
    } else if (event.target.name === "description") {
      this.setState({
        newCategory: {
          name: this.state.newCategory.name,
          description: event.target.value
        }
      });
    }
  }

  render() {
    const { currentUser, activeItem, isAdmin, newCategory } = this.state;
    return (
      <CatContext.Consumer>
        {context => (
          <Fragment>
            {currentUser && (
              <Navbar
                user={currentUser.firstName + " " + currentUser.lastName}
                onLogout={this.logout}
              ></Navbar>
            )}
            {activeItem && (
              <Container fluid style={{ padding: "2rem" }}>
                <Grid columns={2} divided>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <Message warning>
                        <Message.Header>Categories</Message.Header>
                      </Message>
                      <VerticalList
                        activeItem={activeItem}
                        categories={context.data.categories}
                        onHandleItem={this.handleItemClick}
                      ></VerticalList>
                      {isAdmin && (
                        <Fragment>
                          <Message warning>
                            <Message.Header>Create Category</Message.Header>
                          </Message>
                          <Form>
                            <Form.Input
                              fluid
                              name="name"
                              label="Category Name"
                              placeholder="Category Name"
                              value={this.state.newCategory.name}
                              onChange={this.handleChange}
                              required
                            />
                            <Form.TextArea
                              name="description"
                              label="Category Description"
                              placeholder="Category Description"
                              value={this.state.newCategory.description}
                              onChange={this.handleChange}
                            />
                            <Button
                              primary
                              type="submit"
                              onClick={event => {
                                context.createCategory(newCategory);
                              }}
                            >
                              Submit
                            </Button>
                          </Form>
                        </Fragment>
                      )}
                    </Grid.Column>
                    <Grid.Column width={13}>
                      <RedTable
                        onCreateHeader={this.createHeader(
                          context.data.categories
                        )}
                        onCreateTable={this.createTable(
                          context.data.categories
                        )}
                      ></RedTable>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            )}
          </Fragment>
        )}
      </CatContext.Consumer>
    );
  }
}

export { CategoriesPage };
