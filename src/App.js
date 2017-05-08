import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import {DEFAULT, MAPS} from  './data/index';
import {parseQs} from './util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState(props);
    window.onhashchange = () => this.setState(this.initialState(this.props));
  }

  initialState(props) {
    let qs;
    try {
      qs = parseQs(document.location.hash.slice(1));
    } catch (e) {
      console.error(e);
      qs = {};
    }
    return {
      mapName: MAPS[qs.mapName] ? qs.mapName : DEFAULT,
      mapSave: qs.mapSave,
      showParties: qs.showParties ? qs.showParties === "true" : false,
    }
  }

  mapData() {
    return MAPS[this.state.mapName];
  }

  handleSave(save) {
    document.location.hash = (`mapName=${this.state.mapName}` +
                              `&showParties=${this.state.showParties}` +
                              `&mapSave=${save}`);
  }
  
  render() {
    return <Map scale={100}
                save={this.state.mapSave}
                onSave={this.handleSave.bind(this)}
                showParties={this.state.showParties}
                {...this.mapData()} />
  }
}

export default App;
