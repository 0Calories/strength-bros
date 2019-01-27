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
      user_id: "",
      room_id: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState(prevState => {
      return { [key]: value };
    });
  }

  onClickCreate = e => {
    e.preventDefault();
    this.setState(() => ({
      clickedCreate: true
    }));
  };

  onClickJoin = e => {
    e.preventDefault();

    const socket = io.connect("http://172.30.182.196:6969"); //TODO change

    socket.emit("join_room", { room_id: this.state.value, username: this.state.username });

    socket.once("room_connection_successful", data => {
      console.log(data);
      this.setState({ isJoin: true, user_id: data.user_id });
    });
  };

  render() {
    if (this.state.isJoin) {
      return (
        <AthleteView
          username={this.state.user_id}
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
              placeholder="Username"
              aria-label="Search"
              name ="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Join Game"
              aria-label="Search"
              name ="value"
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
