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
    try {
      let qs = parseQs(document.location.hash.slice(1));
      // TODO: better merging of each prop's defaults
      if (qs.mapName && MAPS[qs.mapName]) {
        return {
          mapName: qs.mapName,
          mapSave: qs.mapSave,
          showParties: qs.showParties == "true",
        }
      }
    } catch (e) {
      console.error(e);
    }
    return {mapName: DEFAULT, showParties: false};
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
