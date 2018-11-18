// @flow
import React, { Component } from 'react';
import {districtColors} from './constants';
import House from './House';
import type {PrecinctData} from './types';

type Props = {|
  ...PrecinctData,
  district: number,   // not null, here
  onMouseDown: (any) => void,
  onMouseEnter: (any) => void,
  onMouseUp: (any) => void,
  onContextMenu: (any) => void,
|}

class Precinct extends Component<Props> {
  render() {
    const {
        district, dots, party,
        onMouseDown, onMouseEnter, onMouseUp, onContextMenu,
        ...props} = this.props;
    return <g {...{onMouseDown, onMouseEnter, onMouseUp, onContextMenu}}>
      <rect stroke="black" strokeWidth="0.01" fill={districtColors[district]} {...props} />
      {dots && dots.map((point, i) => <House party={party} point={point} key={i} />)}
    </g>;
  }
}

export default Precinct;
