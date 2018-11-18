// @flow

export type Party = "D" | "R";

export type Point = {|x: number, y: number|};

export type PrecinctData = {|
  x: number,
  y: number,
  width: number,
  height: number,
  district?: number,
  party?: Party,
  dots: $ReadOnlyArray<Point>,
|}

export type StatByParty = {|R: number, D: number|};

type DistrictInfoBase = {|
  id: number,
  idealSize?: number,
  precincts: $ReadOnlyArray<PrecinctData>,
  parties: null,
  wasted: null,
  winner: null,
|}

export type DistrictInfoWithParties = {|
  ...DistrictInfoBase,
  idealSize: number,
  parties: StatByParty,
  wasted: StatByParty,
  winner: Party,
|}

export type DistrictInfo = DistrictInfoBase | DistrictInfoWithParties;

export type MapData = {|
  scale: number,
  width: number,
  height: number,
  numDistricts: number,
  precincts: $ReadOnlyArray<PrecinctData>,
|}
