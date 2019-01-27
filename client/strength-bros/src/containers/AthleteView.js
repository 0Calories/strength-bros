import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io.connect('172.30.181.101:6969');

const FLAT = 0;
const UPRIGHT = 1;

let consistencyCounter = 0;

export default class AthleteView extends React.Component {

  state = {
    username: "",
    room_id: "",
    accX: undefined,
    accY: undefined,
    accZ: undefined,
    orientation: FLAT,
    motion: 'None',
    ready: false,
    gameStart: false
  }

  // Set up accelerometer logic
  componentWillMount() {
    // this.setState({username: this.props.match.params.username})
    this.setState({username: this.props.username, room_id: this.props.room_id})
    window.ondevicemotion = (e) => {

      let accX = e.accelerationIncludingGravity.x.toFixed(4);
      let accY = e.accelerationIncludingGravity.y.toFixed(4);
      let accZ = e.accelerationIncludingGravity.z.toFixed(4);

      // We can check the orientation of the phone by checking which axis has the force of gravity acting on it.
      let orientation;
      if (accZ >= 7)
        orientation = FLAT;
      else if (accY >= 7)
        orientation = UPRIGHT;
      else
        orientation = FLAT;

      this.setState({
        accX,
        accY,
        accZ,
        orientation
      });

      // Check if the acceleration was above 1 for 10 ticks in a row, we will consider that a squat
      if (orientation === FLAT && accZ >= 15) {
        consistencyCounter++;
      } else if (orientation === UPRIGHT && accY >= 12) {
        consistencyCounter++;
      } else {
        consistencyCounter = 0;
      }

      if (consistencyCounter === 10) {
        this.setState({ motion: 'Squat' });

        socket.emit('user_action', { 
          room_id: 69420,
          user_id: this.state.username,
          game_type: 'Squat Race',
          action_type: 'Squat',
          action_data: undefined
        });

        setTimeout(() => {
          this.setState({ motion: 'None' });
        }, 1500);
      }
    }
  }

  handleReady = () => {
    socket.emit('user_status_update', {
      room_id: 69420,
      username: this.state.username,
      user_status: 'Ready'
    });
    this.setState({ ready: true });
  }

  render() {
    return (
      
      <div>
        {!this.state.gameStart && <h2>Waiting for other players....</h2>}
        
        {!this.state.ready && 
        <button 
          className="btn btn-large btn-primary"
          onClick={this.handleReady}
        >
          Ready
        </button>
      }

        <ul>
          <li>acceleration x: {this.state.accX}</li>
          <li>acceleration y: {this.state.accY}</li>
          <li>acceleration z: {this.state.accZ}</li>
        </ul>

        {this.state.motion === 'Squat' && <h1>Nice Squat!</h1>}
        {this.state.motion === 'None' && <h1>No Motion</h1>}
      </div>
    );
  }

}