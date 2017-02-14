import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import BaseMapData from  './data/BaseMap';

class App extends Component {
  render() {
    return <Map scale={100} width={4} height={6} numDistricts={4}
                precincts={BaseMapData}/>
  }
}

export default App;
