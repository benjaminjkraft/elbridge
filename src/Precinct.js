import React, { Component, PropTypes } from 'react';
import {districtColors, partyData} from './Constants';

class Precinct extends Component {
  renderDots(dots, party) {
    const color = party ? partyData[party].color: "black";
    // TODO(benkraft): make dots clickable too
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
