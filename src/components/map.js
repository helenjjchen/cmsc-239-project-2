import React, {Component} from 'react';
import ReactMapGL from 'react-map-gl';
import {Hint, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
import {groupBy, formatPriceBarData, getMedianData} from '../utils';
import Select from 'react-select';

export default class AirbnbMap extends Component {
  constructor(props) {
    super(props);
    const {data} = this.props;
    const groupHoodData = groupBy(data, 'neighbourhood_cleansed');
    const initRoomTypes = ['Shared room', 'Private room', 'Entire home/apt'];
    const medianPriceData = getMedianData(groupHoodData);
    const dropdownOptions = Object.keys(groupHoodData).map((hoodName) => {
      const entry = {value: hoodName, label: hoodName};
      return entry;
    });
    this.state = {
      gHoodData: groupHoodData,
      dropdown: dropdownOptions,
      roomTypes: initRoomTypes,
      priceData: medianPriceData,
      selectedHood: 'Avondale',
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
      selectedHood: dropdownSelect.value
    });
  }

  render() {
    const {gHoodData, dropdown, roomTypes, priceData, selectedHood, selectedBar} = this.state;
    const selectedPriceData = formatPriceBarData(priceData[selectedHood]);
    return (
      <div>
        <ReactMapGL
          width={400}
          height={400}
          latitude={41.8781}
          longitude={-87.6298}
          zoom={8}
          mapboxApiAccessToken={'pk.eyJ1IjoiMDAxd3dhbmciLCJhIjoiY2p3cTI3cGR6MWZwZjRhcDhnajliMTZ3ZSJ9.fgblubMtl1JgN31RQUw13A'}
          onViewportChange={(viewport) => {
            const {width, height, latitude, longitude, zoom} = viewport;
            // Optionally call `setState` and use the state to update the map.
          }}
        />
      </div>
    );
  }
}
