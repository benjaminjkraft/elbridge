import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import UnevenMapData from  './data/UnevenMap';

class App extends Component {
  render() {
    return <Map scale={100} {...UnevenMapData} />
  }
}

export default App;
