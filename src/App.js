import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import MapData from  './data/SingleCityMap';

class App extends Component {
  render() {
    return <Map scale={100} {...MapData} />
  }
}

export default App;
