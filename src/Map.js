import React, { Component, PropTypes } from 'react';
import Precinct from './Precinct';

class Map extends Component {
  makePrecinctClickHandler(id) {
    return () => {
      const precinct = this.state.precincts[id];
      const oldDistrict = precinct.props.district
      let newDistrict;
      if (!oldDistrict || oldDistrict >= this.props.numDistricts) {
        newDistrict = 1;
      } else {
        newDistrict = oldDistrict + 1;
      }
      this.setState(({precincts}, _) => {
        precincts[id] = <Precinct {...precinct.props}
                                  district={newDistrict} key={id} />;
        return {precincts};
      });
    }
  }

  constructor(props) {
    super(props);
    const {scale, width, height} = this.props;
    const precincts = {}
    let id;
    Array(width).fill().forEach((_, i) =>
      Array(height).fill().forEach((_, j) => {
        id = `${i},${j}`;
        precincts[id] = <Precinct key={id} x={i * scale} y={j * scale}
                                  size={scale} district={0} 
                                  onClick={this.makePrecinctClickHandler(id)}
                                  />;
      }));
    this.state = {precincts}
  }

  render() {
    const {scale, width, height} = this.props;

    return (
      <div className="container">
        <div className="map-container">
          <svg width={width * scale} height={height * scale} className="map">
            {Object.values(this.state.precincts)}
          </svg>
        </div>
        <div className="data-container">
          <span className="data-line">Data goes here.</span>
        </div>
      </div>
    );
  }
}

Map.PropTypes = {
  scale: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  numDistricts: PropTypes.number.isRequired,
};


export default Map;
