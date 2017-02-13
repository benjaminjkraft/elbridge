import React, { Component } from 'react';
import './App.css';
import Map from './Map';

class App extends Component {
  render() {
    const precincts = [
      {x: 0, y: 0, width: 1, height: 1, dots: [{x: 0.1, y: 0.1}, {x: 0.2, y: 0.3}], party: "R"},
      {x: 1, y: 0, width: 1, height: 1, dots: [{x: 1.1, y: 0.1}, {x: 1.2, y: 0.3}], party: "D"},
      {x: 2, y: 0, width: 1, height: 1, dots: [{x: 2.1, y: 0.1}, {x: 2.2, y: 0.3}]},
      {x: 3, y: 0, width: 1, height: 1},
      {x: 0, y: 1, width: 1, height: 1},
      {x: 1, y: 1, width: 1, height: 1},
      {x: 2, y: 1, width: 1, height: 1},
      {x: 3, y: 1, width: 1, height: 1},
      {x: 0, y: 2, width: 1, height: 1},
      {x: 1, y: 2, width: 1, height: 1},
      {x: 2, y: 2, width: 1, height: 1},
      {x: 3, y: 2, width: 1, height: 1},
      {x: 0, y: 3, width: 1, height: 1},
      {x: 1, y: 3, width: 1, height: 1},
      {x: 2, y: 3, width: 1, height: 1},
      {x: 3, y: 3, width: 1, height: 1},
      {x: 0, y: 4, width: 1, height: 1},
      {x: 1, y: 4, width: 1, height: 1},
      {x: 2, y: 4, width: 1, height: 1},
      {x: 3, y: 4, width: 1, height: 1},
      {x: 0, y: 5, width: 1, height: 1},
      {x: 1, y: 5, width: 1, height: 1},
      {x: 2, y: 5, width: 1, height: 1},
      {x: 3, y: 5, width: 1, height: 1},
    ];
    return <Map scale={100} width={4} height={6} numDistricts={4}
                precincts={precincts}/>
  }
}

export default App;
