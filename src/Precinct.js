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
    const {x, y, size, district, ...props} = this.props;
    return <rect stroke="black" fill={districtColors[district]}
                 x={x} y={y} width={size} height={size}
                 {...props} />;
  }
}

Precinct.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  district: PropTypes.number.isRequired,
};

export default Precinct;
