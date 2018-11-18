// @flow
import React, { Component } from 'react';
import type {Point} from './types';
import {partyData} from './constants';

type Props = {|
  point: Point,
  party?: string,
|}

const UNIT = 0.03;
const HOUSE_SHAPE = [
  [0, -1.5],
  [1.5, 0],
  [1, 0],
  [1, 1.5],
  [-1, 1.5],
  [-1, 0],
  [-1.5, 0],
]

export default class House extends Component<Props> {
  render() {
    const {party, point: {x, y}} = this.props;
    return <polygon points={HOUSE_SHAPE.map(([dx, dy]) => `${x + dx * UNIT} ${y + dy * UNIT}`).join(", ")}
                    fill={party ? partyData[party].color: "black"} />;
  }
}
