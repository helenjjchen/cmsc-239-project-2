import React, {Component} from 'react';
import Select from 'react-select';
import ReactMapGL from 'react-map-gl';
import {groupBy} from '../utils';
import {fromJS} from 'immutable';
const REACT_APP_MAPBOX_TOKEN = 'pk.eyJ1IjoiMDAxd3dhbmciLCJhIjoiY2p3cTI3cGR6MWZwZjRhcDhnajliMTZ3ZSJ9.fgblubMtl1JgN31RQUw13A';

export default class AirbnbMap extends Component {
  constructor(props) {
    super(props);
    const {data} = this.props;
    const initGroupHoodData = groupBy(data, 'first_year');
    const dropdownOptions = Object.keys(initGroupHoodData).map((year) => {
      const entry = {value: year, label: year};
      return entry;
    });
    const groupHoodData = Object.keys(initGroupHoodData).reduce((formatHData, year) => {
      formatHData[year] = Object.keys(initGroupHoodData).reduce((entry, yr) => {
        if (Number(year) >= Number(yr)) {
          entry = entry.concat(initGroupHoodData[yr]);
        }
        return entry;
      }, []);
      return formatHData;
    }, {});
    this.state = {
      gHoodData: groupHoodData,
      dropdown: dropdownOptions,
      selectedYear: '2009',
      selectedBar: false
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleDataSelect = this.handleDataSelect.bind(this);
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

  render() {
    const {gHoodData, dropdown, selectedYear, selectedBar} = this.state;
    const locationsData = gHoodData[selectedYear].map((listing) => {
      return {longitude: Number(listing.longitude), latitude: Number(listing.latitude)};
    });
    const featuresData = locationsData.map((location) => {
      const feat = {};
      feat.type = 'Feature';
      feat.geometry = {type: 'Point', coordinates: [Number(location.longitude), Number(location.latitude)]};
      return feat;
    });
    const mapStyle = fromJS({
      version: 8,
      sources: {
        points: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: featuresData
          }
        },
        mapboxstreets: {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v6'
        }
      },
      layers: [
        {
          id: 'my-layer',
          type: 'circle',
          source: 'points',
          paint: {
            'circle-radius': 3,
            'circle-color': '#F16664',
            'circle-opacity': 0.6
          }
        },
        {
          id: 'water',
          source: 'mapboxstreets',
          'source-layer': 'water',
          type: 'fill',
          paint: {
            'fill-color': '#61B7B6'
          }
        },
        {
          id: 'landuse',
          source: 'mapboxstreets',
          'source-layer': 'road',
          type: 'fill',
          paint: {
            'fill-color': '#FFD469'
          }
        }
      ]
    });
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
          }}
          mapStyle={mapStyle}>
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
