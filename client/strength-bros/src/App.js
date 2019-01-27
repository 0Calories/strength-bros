import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container">
          <nav className="navbar navbar-dark bg-dark">
            <span className="nav-title">Strength Bros.</span>
          </nav>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Join Game"
              aria-label="Search"
            />
            <button className="btn btn btn-primary" type="submit">
              Join
            </button>
          </form>
          <form>
            <button className="btn btn-large btn-primary">Create Game</button>
          </form>
        </div>
      </div>

      
    );
  }
}

export default App;
