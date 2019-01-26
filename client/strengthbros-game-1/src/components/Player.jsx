import React, { Component } from "react";

class Player extends Component {
  handleKeyDown = e => {
    switch (e.keyCode) {
      case 32:
        console.log("Space bar pressed");
        break;
      case 16:
        console.log("Shift pressed");
        break;
      default:
        return;
    }
  };

  render() {
    return <circle cx={0} cy={0} r={50} />;
  }

  componentDidMount() {
    window.onkeydown = this.handleKeyDown;
  }
}

export default Player;
