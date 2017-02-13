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
  renderDots(dots) {
    return dots && dots.map(({x, y}) => <circle cx={x} cy={y} r={0.03} />);
  }

  render() {
    const {district, dots, ...props} = this.props;
    return <g>
      <rect stroke="black" strokeWidth="0.01" fill={districtColors[district]} {...props} />
      {this.renderDots(dots)}
    </g>;
  }
}

Precinct.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  district: PropTypes.number.isRequired,
  dots: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })),
};

export default Precinct;
