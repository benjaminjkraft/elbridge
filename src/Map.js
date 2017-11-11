import React, { Component, PropTypes } from 'react';
import Precinct from './Precinct';
import DataTable from './DataTable';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState(props);
  }

  blankState(props) {
    return {
      precinctStates: props.precincts.map(_ => 0),
      draggingDistrict: null,
      lastDragged: null,
    };
  }

  initialState(props) {
    if (props.save) {
      try {
        return JSON.parse(atob(props.save));
      } catch (e) {
        console.error(e);
      }
    }
    return this.blankState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.initialState(nextProps));
  }

  setPrecinctDistrict(index, district) {
    this.setState(({precinctStates}, _) => {
      precinctStates[index] = district;
      return {precinctStates};
    });
  }

  chooseNewDistrict() {
    const counts = Array(this.props.numDistricts + 1).fill(0);
    this.state.precinctStates.forEach(i => counts[i] += 1);
    counts.forEach((count, i) => {
      if (i && !count) {
        return i;
      }
    });
    if (this.state.lastDragged === this.props.numDistricts) {
      return 1;
    } else if (this.state.lastDragged) {
      return this.state.lastDragged + 1;
    } else {
      // Not sure we can get here.
      return 1;
    }
  }

  makePrecinctMouseDownHandler(index) {
    return (ev) => {
      let district = this.state.precinctStates[index];
      if (!district) {
        // It's blank; fill with the next unused color, if any, or XXX if not
        district = this.chooseNewDistrict()
      } else if (ev.button === 0) {
        district++;
      } else if (ev.button === 2) {
        district--;
      }

      if (district <= 0) {
        district += this.props.numDistricts;
      } else if (district > this.props.numDistricts) {
        district -= this.props.numDistricts;
      }
      this.setPrecinctDistrict(index, district);
      this.setState({draggingDistrict: district});
    }
  }

  makePrecinctMouseEnterHandler(index) {
    return () => this.mouseNext(index);
  }

  makePrecinctMouseUpHandler(index) {
    return () => {
      this.mouseNext(index);
      this.mouseDone();
    }
  }

  handleMouseLeave() {
    this.mouseDone();
  }

  /**
   * Handle the mouse-drag visiting this district.
   */
  mouseNext(index) {
    if (this.state.draggingDistrict) {
      this.setPrecinctDistrict(index, this.state.draggingDistrict);
    }
  }

  /**
   * Handle the mouse-drag being completed.
   */
  mouseDone() {
    this.setState({
      draggingDistrict: null,
      lastDragged: this.state.draggingDistrict || this.state.lastDragged,
    });
  }

  reset() {
    this.setState(this.blankState(this.props));
  }

  save() {
    this.props.onSave(btoa(JSON.stringify(this.state)));
  }

  share() {
    this.props.onShare(btoa(JSON.stringify(this.state)));
  }

  render() {
    const {scale, width, height, numDistricts, precincts} = this.props;

    return (
      <div className="container">
        <div className="map-container">
          <svg className="map" width={width * scale} height={height * scale}
               viewBox={`0 0 ${width} ${height}`}
               onMouseLeave={this.handleMouseLeave.bind(this)}>
            {precincts.map((precinct, i) => {
              return <Precinct
                key={[precinct.x, precinct.y]} {...precinct}
                party={this.props.showParties ? precinct.party : undefined}
                district={this.state.precinctStates[i] || 0}
                onMouseDown={this.makePrecinctMouseDownHandler(i)}
                onMouseEnter={this.makePrecinctMouseEnterHandler(i)}
                onMouseUp={this.makePrecinctMouseUpHandler(i)}
                onContextMenu={event => event.preventDefault()} />})}

          </svg>
          <div className="map-buttons">
            <button onClick={this.reset.bind(this)}>
              Reset
            </button>
            <button onClick={this.save.bind(this)}>
              Save
            </button>
            <button onClick={this.share.bind(this)}>
              Share
            </button>
          </div>
        </div>
        <DataTable numDistricts={numDistricts}
                   precincts={this.props.precincts}
                   showParties={this.props.showParties}
                   precinctStates={this.state.precinctStates} />
      </div>
    );
  }
}

Map.PropTypes = {
  scale: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  numDistricts: PropTypes.number.isRequired,
  precincts: PropTypes.arrayOf(Precinct.PropTypes),
  save: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  showParties: PropTypes.bool.isRequired,
};


export default Map;
