import React, {Component} from 'react';

import {Hint, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
import {groupBy, formatPriceBarData, getMedianData} from '../utils';
import Select from 'react-select';

export default class PriceBar extends Component {
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
        <h2> Median Price by Room Type — {selectedHood} </h2>
        <div className={'center flex'}>
          <XYPlot
            xType="ordinal"
            stackBy="y"
            width={400}
            height={400}
            margin={{left: 50, right: 50, bottom: 50}}
            >
            <HorizontalGridLines />
            <VerticalBarSeries
              animation
              data={selectedPriceData}
              onValueMouseOver={(datapoint, e) => this.handleMouseOver(datapoint)}
              onSeriesMouseOut={() => this.handleMouseOut()}/>
            {selectedBar !== false && <Hint value={selectedBar} className="smallHint">
              <div>
                <div className={'hint-text-bold'}>{selectedBar.x}</div>
                <div className={'hint-text'}>
                  {selectedBar.y}
                </div>
              </div>
            </Hint>}
            <XAxis style={{fontFamily: 'Montserrat'}}/>
            <YAxis title="Median Price (USD)" style={{fontFamily: 'Montserrat'}}/>
          </XYPlot>
          <div className="dropdown-menu">
            <Select
              options={dropdown}
              isSearchable={true}
              defaultValue={{label: selectedHood, value: 0}}
              onChange={(hood) => this.handleDataSelect(hood)}/>
          </div>
        </div>
      </div>
    );
  }
}
