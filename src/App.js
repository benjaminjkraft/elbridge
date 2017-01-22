import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const precincts = (
      Array(4).fill().map((_, i) =>
        Array(6).fill().map((_, j) =>
          <rect stroke="black" fill="white"
                x={i * 100} y={j * 100}
                width="100" height="100" />)));
    return (
      <div className="container">
        <div className="map-container">
          <svg width="400" height="600" className="map">
            {precincts}
          </svg>
        </div>
        <div className="data-container">
          <span className="data-line">Data goes here.</span>
        </div>
      </div>
    );
  }
}

export default App;
