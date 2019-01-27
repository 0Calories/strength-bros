import React, { Component } from "react";
import io from "socket.io-client";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AthleteView from "../containers/AthleteView";
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" , isJoin: false, username: "", room_id: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  onCreateClick = e => {
    e.preventDefault();
    var socket = io.connect("http://localhost:6969");
    socket.emit("create_room", { type: "data" });

    socket.once("room_data", data => {
      console.log(data);
      this.setState({room_id: data.room_id});
      // $('#room_id').html( "Room ID: " + data.room_id ); 
    });
  };

  onJoinClick = e => {
    e.preventDefault();

    var socket = io.connect("http://localhost:6969");

    socket.emit("join_room", { room_id: this.state.value, username: "test" });

    socket.once("room_connection_successful", data => {
      console.log(data);
      this.setState({isJoin: true, username: data.user_id});
    });
  };

  render() {
    if (this.state.isJoin){
      return (<AthleteView username={this.state.username} room_id={this.state.room_id}></AthleteView>);
    }
    return (
      <div className="App">
        <div className="container">
          <nav className="navbar navbar-dark bg-dark">
            <span className="nav-title">Strength Bros.</span>
          </nav>
          <form className="form-inline" onSubmit={this.onJoinClick}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Join Game"
              aria-label="Search"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button className="btn btn btn-primary" type="submit" >
              Join
            </button>
          </form>
          <form onSubmit={this.onCreateClick}>
            <button className="btn btn-large btn-primary">Create Game</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Landing;
