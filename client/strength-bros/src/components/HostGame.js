import React, { Component } from "react";
import io from "socket.io-client";
import Game from "../containers/Game";

class HostGame extends Component {
  state = { gameStarted: false, gameSelected: "", allPlayersReady: false };

  componentWillMount() {
    const socket = io.connect("https://strength-bros-230022.appspot.com/");

    socket.emit("create_room", { type: "data" });

    socket.on("room_data", data => {
      this.setState(() => ({
        ...this.state,
        ...data
      }));
    });

    socket.on("update_data", data => {
      this.setState(() => ({
        ...this.state,
        ...data
      }));
    });

    socket.on("players_ready", data => {
      this.setState(() => ({
        ...this.state,
        allPlayersReady: data
      }));
    });

    socket.on("update", data => {
      console.log("Updata data received: " + data);
      this.setState({
        participants: data.participants
      });
    });
  }

  onSelectGame = e => {
    const gameName = e.target.name;
    this.setState(() => ({
      gameSelected: gameName
    }));
  };

  onStartGame = () => {
    this.setState(() => ({
      gameStarted: true
    }));
  };

  render() {
    if (!this.state.room_id) {
      return <div>Creating...</div>;
    }

    if (this.state.gameStarted) {
      return <Game participants={this.state.participants} />;
    }

    const participants = this.state.participants.map((participant, index) => (
      <li key={index}>
        {participant.username}:{" "}
        {participant.is_ready ? "Ready!" : "Not ready..."}
      </li>
    ));

    return (
      <div className="container main">
        <div className="">
          <nav className="navbar navbar-light bg-light">
            <span className="nav-title">Room ID:</span>
            <span className="nav-title">{this.state.room_id} </span>
          </nav>
        </div>
        <div className="container text-stuff center-block">
          <div className="participants">
            {this.state.participants.length}/{this.state.max_participants}
          </div>

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
              this.state.gameSelected === "thePlank"
                ? "btn-primary"
                : "btn-light"
            }`}
            name="thePlank"
            onClick={this.onSelectGame}
            disabled
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
          {this.state.allPlayersReady && (
            <button className="btn btn-success" onClick={this.onStartGame}>
              Start Game
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default HostGame;
