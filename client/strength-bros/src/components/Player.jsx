import React, { Component } from "react";

class Player extends Component {
  state = {
    standing: true,
    username: undefined,
    score: 0
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.score !== this.props.score) {
      this.setState({ standing: false }, () => {
        setTimeout(() => {
          this.setState({ standing: true });
        }, 500);
      });
    }
  }

  render() {
    const { position, color } = this.props;

    const playerStyle = {
      fill: color
    };

    return (
      <g>
        {this.state.standing ? (
          <rect
            id="player"
            data-name="player"
            style={playerStyle}
            x={position}
            y={-102}
            width={50}
            height={100}
            className='player'
          />
        ) : (
          <rect
            id="player"
            data-name="player"
            style={playerStyle}
            x={position - 25}
            y={-51}
            width={100}
            height={50}
            className='player--squatting'
          />
        )}
        <text
          x={position + 25}
          y={-110}
          fontFamily="Verdana"
          fontSize={20}
          textAnchor="middle"
        >
          {this.props.score}
        </text>
        <text
          x={position + 25}
          y={-2}
          fontFamily="Verdana"
          fontSize={20}
          textAnchor="middle"
        >
          {this.props.username}
        </text>
      </g>
    );
  }

  componentDidMount() {
    window.onkeydown = this.handleKeyDown;
    window.onkeyup = this.handleKeyUp;
  }
}

export default Player;
