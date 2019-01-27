import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import "./App.css";

import Landing from "./components/Landing";
import AthleteView from "./containers/AthleteView";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/athlete/" component={AthleteView}/> 

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
