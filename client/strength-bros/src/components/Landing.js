import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";
import AthleteView from "../containers/AthleteView";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      isJoin: false,
      clickedCreate: false,
      username: "",
      room_id: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  onClickCreate = e => {
    e.preventDefault();
    this.setState(() => ({
      clickedCreate: true
    }));
  };

  onClickJoin = e => {
    e.preventDefault();

    const socket = io.connect("http://localhost:6969");

    socket.emit("join_room", { room_id: this.state.value, username: "test" });

    socket.once("room_connection_successful", data => {
      console.log(data);
      this.setState({ isJoin: true, username: data.user_id });
    });
  };

  render() {
    if (this.state.isJoin) {
      return (
        <AthleteView
          username={this.state.username}
          room_id={this.state.room_id}
        />
      );
    }
    if (this.state.clickedCreate) {
      return <Redirect to="/host-game" />;
    }
    return (
      <div className="App">
        <div className="container">
          <nav className="navbar navbar-dark bg-dark">
            <span className="nav-title">Strength Bros.</span>
          </nav>
          <form className="form-inline" onSubmit={this.onClickJoin}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Join Game"
              aria-label="Search"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button className="btn btn btn-primary" type="submit">
              Join
            </button>
          </form>
          <form onSubmit={this.onClickCreate}>
            <button className="btn btn-large btn-primary">Create Game</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Landing;
