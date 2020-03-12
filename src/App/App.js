import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history, Role } from "../Helpers";
import { authenticationService } from "../Services";
import { LoginPage } from "../LoginPage";
import { CategoriesPage } from "../CategoriesPage";
import { PrivateRoute } from "../Components";
import { CategoriesProvider } from "../Providers";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAdmin: false
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x =>
      this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin
      })
    );
  }

  render() {
    return (
      <CategoriesProvider>
        <Router history={history}>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={() => <CategoriesPage user={this.state} />}
            />
            <PrivateRoute
              path="/home"
              component={() => <CategoriesPage user={this.state} />}
            />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Router>
      </CategoriesProvider>
    );
  }
}
