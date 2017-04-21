import React, { Component, PropTypes } from 'react';
import Precinct from './Precinct';
import DataTable from './DataTable';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState(props)
  }

  initialState(props) {
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
    return () => {
      const oldDistrict = this.state.precinctStates[index];
      let newDistrict;
      if (!oldDistrict || oldDistrict >= this.props.numDistricts) {
        newDistrict = 1;
      } else {
        newDistrict = oldDistrict + 1;
      }
      this.setPrecinctDistrict(index, newDistrict);
      this.setState({draggingDistrict: newDistrict});
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
                        onMouseUp={this.makePrecinctMouseUpHandler(i)} />)}

          </svg>
          <div className="map-buttons">
            <button onClick={this.reset.bind(this)}>
              Reset
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
