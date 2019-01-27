import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import Landing from "./components/Landing";
import AthleteView from "./AthleteView";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/athlete" component={AthleteView} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
