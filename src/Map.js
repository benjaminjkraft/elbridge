import React, { Component, PropTypes } from 'react';
import Precinct from './Precinct';
import DataTable from './DataTable';

class Map extends Component {
  setPrecinctDistrict(id, district) {
    this.setState(({precincts}, _) => {
      precincts[id] = <Precinct {...precincts[id].props}
                                district={district} key={id} />;
      return {precincts};
    });
  }

  makePrecinctMouseDownHandler(id) {
    return () => {
      const precinct = this.state.precincts[id];
      const oldDistrict = precinct.props.district
      let newDistrict;
      if (!oldDistrict || oldDistrict >= this.props.numDistricts) {
        newDistrict = 1;
      } else {
        newDistrict = oldDistrict + 1;
      }
      this.setPrecinctDistrict(id, newDistrict);
      this.setState({draggingDistrict: newDistrict});
    }
  }

  makePrecinctMouseEnterHandler(id) {
    return () => {
      if (this.state.draggingDistrict) {
        this.setPrecinctDistrict(id, this.state.draggingDistrict);
      }
    }
  }

  makePrecinctMouseUpHandler(id) {
    return () => {
      if (this.state.draggingDistrict) {
        this.setPrecinctDistrict(id, this.state.draggingDistrict);
      }
      this.setState({draggingDistrict: null});
    }
  }

  handleMouseLeave() {
    this.setState({draggingDistrict: null});
  }

  constructor(props) {
    super(props);
    const {scale, width, height} = this.props;
    const precincts = {}
    let id;
    Array(width).fill().forEach((_, i) =>
      Array(height).fill().forEach((_, j) => {
        id = `${i},${j}`;
        precincts[id] = <Precinct
          key={id} x={i * scale} y={j * scale} size={scale} district={0}
          onMouseDown={this.makePrecinctMouseDownHandler(id)}
          onMouseEnter={this.makePrecinctMouseEnterHandler(id)}
          onMouseUp={this.makePrecinctMouseUpHandler(id)} />;
      }));
    this.state = {precincts}
  }

  render() {
    const {scale, width, height, numDistricts} = this.props;

    return (
      <div className="container">
        <div className="map-container">
          <svg className="map" width={width * scale} height={height * scale}
               onMouseLeave={this.handleMouseLeave.bind(this)}>
            {Object.values(this.state.precincts)}
          </svg>
        </div>
        <DataTable numDistricts={numDistricts}
                   precincts={this.state.precincts} />
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
