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
      failedUserIn: false,
      failedCodeIn: false,
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
    if (this.state.username===""){
      this.setState({failedUserIn: true})

    }else{
      this.setState({failedUserIn: false})
    }
    if (this.state.value===""){
      this.setState({failedCodeIn:true})

    }
    else{
      this.setState({failedCodeIn:false})
    }
    if (!this.state.failedCodeIn || !this.state.failedUserIn){
    const socket = io.connect("http://138.197.166.233:6969"); 

    socket.emit("join_room", { room_id: this.state.value, username: this.state.username });

    socket.once("room_connection_successful", data => {
      console.log(data);
      this.setState({ isJoin: true, user_id: data.user_id });
    });
  }
 };

  render() {
    if (this.state.isJoin) {
      return (
        <AthleteView
          username={this.state.user_id}
          room_id={this.state.value}
        />
      );
    }
    if (this.state.clickedCreate) {
      return <Redirect to="/host-game" />;
    }
    return (
      <div className="App">
        <div className="gridChild container">
          <nav className="navbar navbar-light bg-light">
            <span className="nav-title">Strength Bros.</span>
          </nav>       
        </div>
        <div className="gridChild container center-block">
            <form className="form container" onSubmit={this.onClickJoin}>
              <div className="form-group container">
              <input
                  className="form-control mr-sm-1"
                  type="search"
                  placeholder="Username"
                  aria-label="Search"
                  name ="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <input
                  className="form-control mr-sm-1"
                  type="search"
                  placeholder="Join Code"
                  aria-label="Search"
                  name ="value"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
            </div>
              <div className="form-group">
                <button className="btn btn btn-primary" type="submit">
                Join
              </button>
            </div>
            </form>
          <div className="error">{this.state.failedCodeIn ? "Code cannot be blank": ""}</div>
          <div className="error">{this.state.failedUserIn ? "Username cannot be blank": ""}</div>
          </div>
        <div  className="gridChild">
            <form onSubmit={this.onClickCreate}>
              <button className="btn btn-large btn btn-outline-dark">Create Game</button>
            </form>
          </div>
      </div>
    );
  }
}

export default Landing;
