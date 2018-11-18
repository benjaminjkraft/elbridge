// @flow
import React, { Component } from 'react';
import type {PrecinctData, Point} from './types';
import {districtColors, partyData} from './constants';

type Props = {|
  ...PrecinctData,
  district: number,   // not null, here
  onMouseDown: (any) => void,
  onMouseEnter: (any) => void,
  onMouseUp: (any) => void,
  onContextMenu: (any) => void,
|}

class Precinct extends Component<Props> {
  renderDots(dots: $ReadOnlyArray<Point>, party?: string): any {
    const color = party ? partyData[party].color: "black";
    // TODO(benkraft): make dots clickable too
    return dots && dots.map(({x, y}, i) => <circle fill={color} key={i} cx={x} cy={y} r={0.03} />);
  }

  render() {
    const {
        district, dots, party,
        onMouseDown, onMouseEnter, onMouseUp, onContextMenu,
        ...props} = this.props;
    return <g {...{onMouseDown, onMouseEnter, onMouseUp, onContextMenu}}>
      <rect stroke="black" strokeWidth="0.01" fill={districtColors[district]} {...props} />
      {this.renderDots(dots, party)}
    </g>;
  }
}

export default Precinct;
