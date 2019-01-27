import React, { Component } from "react";
import Canvas from "../components/Canvas";
import Overlay from "../components/Overlay";

class App extends Component {
  render() {
    const maxScore = 5;
    let showWinOverlay =
      this.props.participants &&
      !this.props.participants.every(
        participant => participant.score < maxScore
      );

    return (
      <div>
        {showWinOverlay && (
          <Overlay
            winner={this.props.participants.find(
              participant => participant.score >= maxScore
            )}
          />
        )}
        <Canvas participants={this.props.participants} />
      </div>
    );
  }
}

export default App;
