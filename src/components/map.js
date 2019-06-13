import React, {Component} from 'react';
import Select from 'react-select';
import ReactMapGL from 'react-map-gl';
import {groupBy} from '../utils';
const REACT_APP_MAPBOX_TOKEN = 'pk.eyJ1IjoiMDAxd3dhbmciLCJhIjoiY2p3cTI3cGR6MWZwZjRhcDhnajliMTZ3ZSJ9.fgblubMtl1JgN31RQUw13A';

export default class AirbnbMap extends Component {
  constructor(props) {
    super(props);
    const {data} = this.props;
    const groupHoodData = groupBy(data, 'first_year');
    const locationsData = groupHoodData['2009'].map((listing) => {
      return {longitude: Number(listing.longitude), latitude: Number(listing.latitude)};
    });
    console.log(locationsData)
    const dropdownOptions = Object.keys(groupHoodData).map((year) => {
      const entry = {value: year, label: year};
      return entry;
    });

    this.state = {
      gHoodData: groupHoodData,
      locations: locationsData,
      dropdown: dropdownOptions,
      selectedYear: '2009',
      selectedBar: false
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleDataSelect = this.handleDataSelect.bind(this);
    this.redraw = this.redraw.bind(this);
  }

  handleMouseOver(datapoint) {
    this.setState({
      selectedBar: datapoint
    });
  }

  handleMouseOut() {
    this.setState({
      selectedBar: false
    });
  }

  handleDataSelect(dropdownSelect) {
    this.setState({
      selectedYear: dropdownSelect.value
    });
  }

  redraw({project}) {
    const [cx, cy] = project([-122, 37]);
    return <circle cx={cx} cy={cy} r={4} fill="blue" />;
  }

  render() {
    const {gHoodData, locations, dropdown, selectedYear, selectedBar} = this.state;
    return (
      <div>
        <ReactMapGL
          width={700}
          height={400}
          latitude={41.8781}
          longitude={-87.6298}
          zoom={10}
          minZoom={9}
          maxZoom={12}
          mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
          {...this.state.viewport}
          onViewportChange={(viewport) => {
            this.setState({viewport});
          }}>
        </ReactMapGL>
        <div className="dropdown-menu">
          <Select
            options={dropdown}
            isSearchable={true}
            defaultValue={{label: selectedYear, value: 0}}
            onChange={(year) => this.handleDataSelect(year)}/>
        </div>
      </div>
    );
  }
}
