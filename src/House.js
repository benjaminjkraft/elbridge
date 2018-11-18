// @flow
import React, { Component } from 'react';
import type {Point} from './types';
import {partyData} from './constants';

type Props = {|
  point: Point,
  party?: string,
|}

export default class House extends Component<Props> {
  render() {
    const {party, point: {x, y}} = this.props;
    const color = party ? partyData[party].color: "black";
    return <circle fill={color} cx={x} cy={y} r={0.03} />;
  }
}
