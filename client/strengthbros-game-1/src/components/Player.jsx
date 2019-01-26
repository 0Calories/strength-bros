import React, { Component } from "react";
import { ReactComponent as StandingSVG } from "../assets/standing.svg";
import { ReactComponent as SquattingSVG } from "../assets/squatting.svg";

class Player extends Component {
  state = {
    standing: true
  };

  handleKeyDown = e => {
    switch (e.keyCode) {
      case 32:
        console.log("Space bar pressed");
        this.setState(() => ({
          standing: false
        }));
        break;
      default:
        return;
    }
  };

  handleKeyUp = e => {
    switch (e.keyCode) {
      case 32:
        console.log("Space bar unpressed");
        this.setState(() => ({
          standing: true
        }));
        break;
      default:
        return;
    }
  };

  render() {
    console.log(this.state.standing);
    if (this.state.standing) {
      return <StandingSVG y={-50} />;
    } else {
      return <SquattingSVG y={-50} />;
    }
  }

  componentDidMount() {
    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;
  }
}

export default Player;
