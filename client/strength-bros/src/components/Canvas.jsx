import React, { Component } from "react";
import randomColor from "randomcolor";

import Sky from "./Sky";
import Ground from "./Ground";
import Player from "./Player";

class Canvas extends Component {
  render() {
    const viewBox = [
      window.innerWidth / -2,
      100 - window.innerHeight,
      window.innerWidth,
      window.innerHeight
    ];
    return (
      <svg id="strength-bros-game-canvas" viewBox={viewBox}>
        <Sky />
        <Ground />
        {this.props.participants.map((player, index) => (
          <Player
            username={player.username}
            score={player.score}
            position={index * 100}
            color={randomColor()}
            key={index}
          />
        ))}
      </svg>
    );
  }
}

export default Canvas;
