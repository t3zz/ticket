import React from "react";
import { Router, Redirect, Switch, Route, withRouter } from "react-router-dom";
import appHistory from "./assets/history";
import {
  Default,
  Tickets,
  Tasks,
  Settings,
  Login,
  Profile,
  Alerts,
  Search
} from "./components/pages/components";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }

  resize = () => this.forceUpdate();

  render() {
    return (
      <Router history={appHistory}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/Login" />
          </Route>
          <Route path="/Overview" component={withRouter(Default)} />
          <Route path="/Tickets" component={withRouter(Tickets)} />
          <Route path="/Tasks" component={withRouter(Tasks)} />
          <Route path="/Settings" component={withRouter(Settings)} />
          <Route path="/Login" component={withRouter(Login)} />
          <Route path="/Profile" component={withRouter(Profile)} />
          <Route path="/Alerts" component={withRouter(Alerts)} />
          <Route path="/Search" component={withRouter(Search)} />
        </Switch>
      </Router>
    );
  }
}

export default App;
