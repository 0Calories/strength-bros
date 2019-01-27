import React, { Component } from "react";
import Canvas from "../components/Canvas";

class App extends Component {
  render() {
    return <Canvas participants={this.props.participants} />;
  }
}

export default App;
