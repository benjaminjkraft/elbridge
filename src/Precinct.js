import React, { Component, PropTypes } from 'react';

const districtColors = {
  0: "white",
  1: "red",
  2: "blue",
  3: "green",
  4: "orange",
  5: "yellow",
}

class Precinct extends Component {
  render() {
    const {district, ...props} = this.props;
    return <rect stroke="black" strokeWidth="0.01" fill={districtColors[district]} {...props} />;
  }
}

Precinct.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  district: PropTypes.number.isRequired,
};

export default Precinct;
