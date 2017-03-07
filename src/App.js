import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import MapData from  './data/DotsFirstMap';

class App extends Component {
  render() {
    return <Map scale={100} {...MapData} />
  }
}

export default App;
