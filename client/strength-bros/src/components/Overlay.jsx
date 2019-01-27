import React, { Component } from "react";
import Confetti from "react-confetti";

class Overlay extends Component {
  render() {
    const dimensions = { width: window.innerWidth, height: window.innerHeight };

    const { winners } = this.props;

    if (!winners) {
      return <div />;
    }

    const winnersString =
      winners.length === 1
        ? winners[0].username
        : winners.reduce((acc, winner) => {
            if (winners.indexOf(winner) === winners.length - 1) {
              return acc + winner.username;
            }
            return acc + winner.username + ", ";
          }, "");
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      >
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>
          {winnersString} wins!
        </h1>
        <Confetti {...dimensions} />
      </div>
    );
  }
}

export default Overlay;
