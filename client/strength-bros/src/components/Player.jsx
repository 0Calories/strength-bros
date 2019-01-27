import React, { Component } from "react";
import io from "socket.io-client";

const socket = io.connect("138.197.166.233:6969");

class Player extends Component {
  state = {
    standing: true,
    username: undefined,
    score: 0
  };

  componentWillMount() {
    socket.on('update_score', data => {

    })
  }

  handleKeyDown = e => {
    switch (e.keyCode) {
      case 32:
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
        this.setState(() => ({
          standing: true
        }));
        break;
      default:
        return;
    }
  };

  render() {
    const { position, color } = this.props;

    const playerStyle = {
      fill: color
    };



    if (this.state.standing) {
      return (
        <g>
          <rect
            id="player"
            data-name="player"
            style={playerStyle}
            x={position}
            y={-102}
            width={50}
            height={100}
          >
          </rect>
          <text 
            x={position}
            y={-2}
            fontFamily="Verdana"
            fontSize={20}
          >
            {this.props.username}
          </text>
        </g>
      );
    } else {
      return (
        <rect
          id="player"
          data-name="player"
          style={playerStyle}
          x={position - 25}
          y={-51}
          width={100}
          height={50}
        />
      );
    }
  }

  componentDidMount() {
    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;
  }
}

export default Player;
