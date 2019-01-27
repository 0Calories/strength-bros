import React, { Component } from "react";
import io from "socket.io-client";

class HostGame extends Component {
  state = { gameSelected: "" };

  componentWillMount() {
    const socket = io.connect("http://138.197.166.233:6969"); 

    socket.emit("create_room", { type: "data" });

    socket.on("room_data", data => {
      this.setState(() => ({
        ...data
      }));
    });

    socket.on("update_data", data => {
      console.log("data:", data)
      this.setState(() => ({
        ...data
      }));
    });
  }

  onSelectGame = e => {
    const gameName = e.target.name;
    this.setState(() => ({
      gameSelected: gameName
    }));
  };

  render() {
    if (!this.state.room_id) {
      return <div>Creating...</div>;
    }

    const participants = this.state.participants.map(participant => (
      <li>
        {participant.username}:
        {participant.is_ready ? "Ready!" : "Not ready..."}
      </li>
    ));

    return (
      <div>
        <p>Room ID: {this.state.room_id}</p>
        <p>
          Participants: {this.state.participants.length}/
          {this.state.max_participants}
        </p>
        <p>Choose Game:</p>
        <button
          className={`btn ${
            this.state.gameSelected === "squatRace"
              ? "btn-primary"
              : "btn-light"
          }`}
          name="squatRace"
          onClick={this.onSelectGame}
        >
          Squat Race
        </button>
        <button
          className={`btn ${
            this.state.gameSelected === "thePlank" ? "btn-primary" : "btn-light"
          }`}
          name="thePlank"
          onClick={this.onSelectGame}
        >
          The Plank
        </button>
        {this.state.participants.length > 0 ? (
          <div>
            <p>Participants:</p>
            <ul>{participants}</ul>
          </div>
        ) : (
          <p>No participants so far... go annoy your friends to join.</p>
        )}
      </div>
    );
  }
}

export default HostGame;
