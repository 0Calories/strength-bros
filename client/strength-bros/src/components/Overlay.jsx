import React, { Component } from "react";
import Confetti from "react-confetti";

class Overlay extends Component {
  render() {
    console.log(this.props);
    const dimensions = { width: window.innerWidth, height: window.innerHeight };
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
          {this.props.winner.username} wins!
        </h1>
        <Confetti {...dimensions} />
      </div>
    );
  }
}

export default Overlay;
