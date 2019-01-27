import React, { Component } from 'react';
import io from 'socket.io-client';

const socket = io();

const FLAT = 0;
const UPRIGHT = 1;

let consistencyCounter = 0;

export default class AthleteView extends React.Component {

  state = {
    accX: undefined,
    accY: undefined,
    accZ: undefined,
    orientation: FLAT,
    motion: 'None'
  };

  // Set up accelerometer logic
  componentWillMount() {

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

      if (consistencyCounter >= 10) {
        this.setState({ motion: 'Squat' });
        setTimeout(() => {
          this.setState({ motion: 'None' });
        }, 1500);
      }
    }
  }

  render() {
    return (
      <div>
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