import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
class App extends Component {
  onCreateClick = (e) =>{
    e.preventDefault();
    var socket = io.connect('http://localhost:6969');
    console.log("TEST")
        socket.emit('create_room', {'type': 'data'} );

        socket.on('room_data', (data) => {
          console.log(data);
          let room_id = data.room_id
          // $('#room_id').html( "Room ID: " + data.room_id );

          
        })
  }
  onJoinClick = (e)=>{
    e.preventDefault();
    
    var socket = io.connect('http://localhost:6969');

        socket.emit('join_room', { 'room_id': this.state.value, 'username': "test" } );

        socket.on('room_connection_successful', (data) => {
          console.log(data);
        })
  }
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
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
              value = {this.state.value}
              onChange ={this.handleChange}
            />
            <button className="btn btn btn-primary" type="submit">
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

export default App;
