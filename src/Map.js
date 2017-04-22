import React, { Component, PropTypes } from 'react';
import Precinct from './Precinct';
import DataTable from './DataTable';
import {parseQs} from './util';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState(props)
    window.onhashchange = () => this.setState(this.initialState(this.props));
  }

  initialState(props) {
    try {
      const qs = parseQs(document.location.hash.slice(1));
      if (qs.save) {
        // TODO: Validate before using
        return JSON.parse(atob(qs.save));
      }
    } catch (e) {
      console.error(e);
    }
    return {
      precinctStates: props.precincts.map(_ => 0),
      draggingDistrict: null,
    };
  }

  setPrecinctDistrict(index, district) {
    this.setState(({precinctStates}, _) => {
      precinctStates[index] = district;
      return {precinctStates};
    });
  }

  makePrecinctMouseDownHandler(index) {
    return (ev) => {
      let district = this.state.precinctStates[index];
      if (ev.button === 0) {
        district = district ? district + 1 : 1;
      } else if (ev.button === 2) {
        district = district ? district - 1 : 0;
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

  makePrecinctMouseEnterHandler(index) {
    return () => {
      if (this.state.draggingDistrict) {
        this.setPrecinctDistrict(index, this.state.draggingDistrict);
      }
    }
  }

  makePrecinctMouseUpHandler(index) {
    return () => {
      if (this.state.draggingDistrict) {
        this.setPrecinctDistrict(index, this.state.draggingDistrict);
      }
      this.setState({draggingDistrict: null});
    }
  }

  handleMouseLeave() {
    this.setState({draggingDistrict: null});
  }

  reset() {
    this.setState(this.initialState(this.props));
  }

  save() {
    document.location.hash = `save=${btoa(JSON.stringify(this.state))}`;
  }

  render() {
    const {scale, width, height, numDistricts, precincts} = this.props;

    return (
      <div className="container">
        <div className="map-container">
          <svg className="map" width={width * scale} height={height * scale}
               viewBox={`0 0 ${width} ${height}`}
               onMouseLeave={this.handleMouseLeave.bind(this)}>
            {precincts.map((precinct, i) =>
              <Precinct key={[precinct.x, precinct.y]} {...precinct}
                        district={this.state.precinctStates[i] || 0}
                        onMouseDown={this.makePrecinctMouseDownHandler(i)}
                        onMouseEnter={this.makePrecinctMouseEnterHandler(i)}
                        onMouseUp={this.makePrecinctMouseUpHandler(i)}
                        onContextMenu={event => event.preventDefault()} />)}

          </svg>
          <div className="map-buttons">
            <button onClick={this.reset.bind(this)}>
              Reset
            </button>
            <button onClick={this.save.bind(this)}>
              Save
            </button>
          </div>
        </div>
        <DataTable numDistricts={numDistricts}
                   precincts={this.props.precincts}
                   precinctStates={this.state.precinctStates} />
      </div>
    );
  }
}

Map.PropTypes = {
  scale: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  numDistricts: PropTypes.number.isRequired,
  precincts: PropTypes.arrayOf(Precinct.PropTypes),
};


export default Map;
