// @flow
import React, { Component } from 'react';
import type {MapData} from './types';
import Precinct from './Precinct';
import DataTable from './DataTable';

type Props = {|
  ...MapData,
  save?: string,
  onSave: string => void,
  onShare: string => void,
  toggleParties: () => void,
  toggleMetrics: () => void,
  showParties: boolean,
  showMetrics: boolean,
|}

type State = {|
  precinctStates: Array<number>,
  draggingDistrict: ?number,
  lastDragged: ?number,
|}

class Map extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = this.initialState(props);
  }

  blankState(props: Props) {
    return {
      precinctStates: props.precincts.map(_ => 0),
      draggingDistrict: null,
      lastDragged: null,
    };
  }

  initialState(props: Props) {
    if (props.save) {
      try {
        return JSON.parse(atob(props.save));
      } catch (e) {
        console.error(e);
      }
    }
    return this.blankState(props);
  }

  setPrecinctDistrict(index: number, district: number) {
    this.setState(({precinctStates}, _) => {
      precinctStates[index] = district;
      return {precinctStates};
    });
  }

  chooseNewDistrict() {
    const counts = Array(this.props.numDistricts + 1).fill(0);
    this.state.precinctStates.forEach(i => counts[i] += 1);
    counts.forEach((count, i) => {
      if (i && !count) {
        return i;
      }
    });
    if (this.state.lastDragged === this.props.numDistricts) {
      return 1;
    } else if (this.state.lastDragged) {
      return this.state.lastDragged + 1;
    } else {
      // Not sure we can get here.
      return 1;
    }
  }

  makePrecinctMouseDownHandler(index: number) {
    return (ev: any) => {
      let district = this.state.precinctStates[index];
      if (!district) {
        // It's blank; fill with the next unused color, if any, or XXX if not
        district = this.chooseNewDistrict()
      } else if (ev.button === 0) {
        district++;
      } else if (ev.button === 2) {
        district--;
      }

      if (district <= 0) {
        district += this.props.numDistricts;
      } else if (district > this.props.numDistricts) {
        district -= this.props.numDistricts;
      }
      this.setPrecinctDistrict(index, district);
      this.setState({draggingDistrict: district});
    }
  }

  makePrecinctMouseEnterHandler(index: number) {
    return () => this.mouseNext(index);
  }

  makePrecinctMouseUpHandler(index: number) {
    return () => {
      this.mouseNext(index);
      this.mouseDone();
    }
  }

  handleMouseLeave() {
    this.mouseDone();
  }

  /**
   * Handle the mouse-drag visiting this district.
   */
  mouseNext(index: number) {
    if (this.state.draggingDistrict) {
      this.setPrecinctDistrict(index, this.state.draggingDistrict);
    }
  }

  /**
   * Handle the mouse-drag being completed.
   */
  mouseDone() {
    this.setState({
      draggingDistrict: null,
      lastDragged: this.state.draggingDistrict || this.state.lastDragged,
    });
  }

  reset() {
    this.setState(this.blankState(this.props));
  }

  save() {
    this.props.onSave(btoa(JSON.stringify(this.state)));
  }

  share() {
    this.props.onShare(btoa(JSON.stringify(this.state)));
  }

  render() {
    const {scale, width, height, numDistricts, precincts} = this.props;

    return (
      <div className="container">
        <div className="map-container">
          <svg className="map" width={width * scale} height={height * scale}
               viewBox={`0 0 ${width} ${height}`}
               onMouseLeave={this.handleMouseLeave.bind(this)}>
            {precincts.map((precinct, i) => {
              return <Precinct
                key={`${precinct.x} ${precinct.y}`} {...precinct}
                party={this.props.showParties ? precinct.party : undefined}
                district={this.state.precinctStates[i] || 0}
                onMouseDown={this.makePrecinctMouseDownHandler(i)}
                onMouseEnter={this.makePrecinctMouseEnterHandler(i)}
                onMouseUp={this.makePrecinctMouseUpHandler(i)}
                onContextMenu={event => event.preventDefault()} />})}

          </svg>
          <div className="map-buttons">
            <button onClick={this.reset.bind(this)}>
              Reset
            </button>
            <button onClick={this.save.bind(this)}>
              Save
            </button>
            <button onClick={this.share.bind(this)}>
              Share
            </button>
            <button onClick={this.props.toggleParties}>
              {this.props.showParties ? "Hide Parties" : "Show Parties"}
            </button>
            {this.props.showParties &&
              <button onClick={this.props.toggleMetrics}>
                {this.props.showMetrics ? "Hide Metrics" : "Show Metrics"}
              </button>}
          </div>
        </div>
        <DataTable numDistricts={numDistricts}
                   precincts={this.props.precincts}
                   showParties={this.props.showParties}
                   showMetrics={this.props.showMetrics}
                   precinctStates={this.state.precinctStates} />
      </div>
    );
  }
}

export default Map;
