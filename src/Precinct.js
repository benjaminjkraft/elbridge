import React, { Component, PropTypes } from 'react';

const districtColors = {
  0: "white",
  1: "#ffc58c",
  2: "#fbff8c",
  3: "#c9ff8c",
  4: "#d68cff",
  5: "#ff8cfd",
}

const partyColors = {
  0: "black",
  R: "red",
  D: "blue",
}

class Precinct extends Component {
  renderDots(dots, party) {
    const color = partyColors[party || 0];
    return dots && dots.map(({x, y}, i) => <circle fill={color} key={i} cx={x} cy={y} r={0.03} />);
  }

  render() {
    const {district, dots, party, ...props} = this.props;
    return <g>
      <rect stroke="black" strokeWidth="0.01" fill={districtColors[district]} {...props} />
      {this.renderDots(dots, party)}
    </g>;
  }
}

Precinct.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  district: PropTypes.number.isRequired,
  party: PropTypes.string,
  dots: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })),
};

export default Precinct;
