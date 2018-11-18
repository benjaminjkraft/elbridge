// @flow
import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import {DEFAULT, MAPS} from  './data/index';
import {parseQs} from './util';

type Props = {||};

type State = {|
  mapName: string,
  mapSave: string,
  showParties: boolean,
  showMetrics: boolean,
|};

// create-react-app magically makes process.env work ($FlowIgnore)
const BACKEND_URL: string = process.env.REACT_APP_BACKEND;

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.initialState(props);
    window.onhashchange = () => this.setState(this.initialState(this.props));
  }

  initialState(props: Props) {
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
      showMetrics: qs.showMetrics ? qs.showMetrics === "true" : false,
    }
  }

  mapData() {
    return MAPS[this.state.mapName];
  }

  handleSave(save: string) {
    document.location.hash = (
        `mapName=${this.state.mapName}` +
        `&showParties=${String(this.state.showParties)}` +
        `&showMetrics=${String(this.state.showMetrics)}` +
        `&mapSave=${save}`);
  }

  handleShare(save: string) {
    this.handleSave(save)
    // TODO: specify name
    // TODO: say we saved
    fetch(`${BACKEND_URL}/share`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `url=${encodeURIComponent(document.location.href)}&name=TODO`,
    })
  }

  handleToggleParties() {
    this.setState({
      showParties: !this.state.showParties,
      showMetrics: this.state.showMetrics && !this.state.showParties,
    });
  }

  handleToggleMetrics() {
    this.setState({showMetrics: !this.state.showMetrics});
  }
  
  render() {
    return <Map scale={100}
                save={this.state.mapSave}
                onSave={this.handleSave.bind(this)}
                onShare={this.handleShare.bind(this)}
                showParties={this.state.showParties}
                showMetrics={this.state.showMetrics}
                toggleParties={this.handleToggleParties.bind(this)}
                toggleMetrics={this.handleToggleMetrics.bind(this)}
                {...this.mapData()} />
  }
}

export default App;
