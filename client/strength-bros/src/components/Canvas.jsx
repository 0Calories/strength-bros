import React, { Component } from "react";
import randomColor from "randomcolor";

import Sky from "./Sky";
import Ground from "./Ground";
import Player from "./Player";

class Canvas extends Component {

  state = {
    colors: []
  };

  componentDidMount() {
    console.log(this.props.participants);
    this.setState({
      colors: this.props.participants.map(participant => randomColor())
    });
  }

  componentWillReceiveProps() {
    let newColor = randomColor();
    this.setState({
      colors: [...this.state.colors, newColor]
    });
  }

  
  render() {
    const viewBox = [
      window.innerWidth / -2,
      100 - window.innerHeight,
      window.innerWidth,
      window.innerHeight
    ];
    console.log(this.props);
    return (
      <svg id="strength-bros-game-canvas" viewBox={viewBox}>
        <Sky />
        <Ground />
        {this.props.participants.map((player, index) => 
          <Player 
            username={player.username}
            score={player.score}
            position={(index * 100) - 400}
            color={this.state.colors[index]}
            key={index}
          />
        )}
      </svg>
    );
  }
  
};

export default Canvas;
