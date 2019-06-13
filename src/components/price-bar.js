import React, {Component} from 'react';

import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
import {getTopHoodsByTotal, groupBy, getRoomDataForHoods, formatPriceBarData, getTopHoodsBy, getMedianData} from '../utils';
import Select from 'react-select';

export default class PriceBar extends Component {
  constructor(props) {
    super(props);
    const {data} = this.props;
    const groupHoodData = groupBy(data, 'neighbourhood_cleansed');
    const initRoomTypes = ['Shared room', 'Private room', 'Entire home/apt'];
    const medianPriceData = getMedianData(groupHoodData);
    this.state = {
      gHoodData: groupHoodData,
      roomTypes: initRoomTypes,
      priceData: medianPriceData,
      selectedHood: 'Avondale'
    };
    this.handleDataSelect = this.handleDataSelect.bind(this);
  }

  handleDataSelect(dropdownSelect) {
    this.setState({
      selectedHood: dropdownSelect.value
    });
  }

  render() {
    const {gHoodData, roomTypes, priceData, selectedHood} = this.state;
    const selectedPriceData = formatPriceBarData(priceData[selectedHood]);
    const dropdownOptions = Object.keys(gHoodData).map((hoodName) => {
      const entry = {value: hoodName, label: hoodName};
      return entry;
    })
    const colors = {
      'Entire home/apt': '#FFC2BD',
      'Private room': '#FFD469',
      'Shared room': '#61B7B6'};
    return (
      <div>
        <XYPlot
          colorType="category"
          xType="ordinal"
          stackBy="y"
          width={300}
          height={450}
          margin={{bottom: 100}}
          >
          <HorizontalGridLines />
          <VerticalBarSeries
            animation
            data={selectedPriceData}/>
          <XAxis tickLabelAngle={-45} style={{fontFamily: 'Montserrat'}}/>
          <YAxis title="Median Price (USD)" style={{fontFamily: 'Montserrat'}}/>
        </XYPlot>
        <Select
          options={dropdownOptions}
          onChange={(hood) => this.handleDataSelect(hood)}/>
      </div>
    );
  }
}
