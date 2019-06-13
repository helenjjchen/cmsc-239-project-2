import React, {Component} from 'react';

import {Hint, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
import {getTopHoodsByTotal, groupBy, getRoomDataForHoods, formatStackBarData, getTopHoodsBy} from '../utils';

export default class StackedBar extends Component {
  constructor(props) {
    super(props);
    const {data} = this.props;
    const gHoodData = groupBy(data, 'neighbourhood_cleansed');
    const topHoods = getTopHoodsByTotal(gHoodData);
    const initRoomData = getRoomDataForHoods(gHoodData, topHoods);
    this.state = {
      roomData: initRoomData,
      roomTypes: ['Shared room', 'Private room', 'Entire home/apt'],
      selectedHood: false,
      selectedRoomData: null
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleDataSelect = this.handleDataSelect.bind(this);
  }

  handleMouseOver(datapoint, roomData) {
    const roomTypes = ['Shared room', 'Private room', 'Entire home/apt'].sort();
    const rData = roomTypes.map(roomType => {
      const roomTypeData = roomData[datapoint.x][roomType];
      const entry = {};
      entry[roomType] = (typeof roomTypeData !== 'undefined') ? roomTypeData.length : 0;
      return entry;
    });
    this.setState({
      selectedHood: datapoint,
      selectedRoomData: rData
    });
  }

  handleMouseOut() {
    this.setState({
      selectedHood: false,
      selectedRoomData: null
    });
  }

  handleDataSelect(selectedRoomType) {
    const {data} = this.props;
    const gHoodData = groupBy(data, 'neighbourhood_cleansed');
    if (selectedRoomType !== 'default') {
      const topHoods = getTopHoodsBy(gHoodData, selectedRoomType);
      const selectedRoomData = getRoomDataForHoods(gHoodData, topHoods);
      this.setState({
        roomTypes: [selectedRoomType],
        roomData: selectedRoomData
      });
    } else {
      const defaults = ['Shared room', 'Private room', 'Entire home/apt'];
      const topHoods = getTopHoodsByTotal(gHoodData);
      const initRoomData = getRoomDataForHoods(gHoodData, topHoods);
      this.setState({
        roomTypes: defaults,
        roomData: initRoomData
      });
    }
  }

  render() {
    const {roomData, roomTypes, selectedHood, selectedRoomData} = this.state;
    const barsData = formatStackBarData(roomTypes, roomData);
    const colors = {
      'Entire home/apt': '#FFC2BD',
      'Private room': '#FFD469',
      'Shared room': '#61B7B6'};
    return (
      <div>
        <XYPlot
          xType="ordinal"
          stackBy="y"
          width={800}
          height={600}
          margin={{bottom: 100}}
          >
          <HorizontalGridLines />
          {roomTypes.map((d, i) => {
            return (
              <VerticalBarSeries
                key={i}
                animation
                data={barsData[d]}
                color={colors[d]}
                onValueMouseOver={(datapoint, e) => this.handleMouseOver(datapoint, roomData)}
                onValueMouseOut={() => this.handleMouseOut()}/>
            );
          })}
          {selectedHood !== false && <Hint value={selectedHood}>
            <div>
              <div className={'hint-text-bold'}>{selectedHood.x}</div>
              {selectedRoomData.map(d => {
                const roomType = Object.keys(d)[0];
                const listingCount = Object.values(d)[0];
                return (
                  <div className={'hint-text'} key={roomType + listingCount}>
                    {`${roomType}: ${listingCount}`}
                  </div>
                );
              })}
            </div>
          </Hint>}
          <XAxis tickLabelAngle={-45} style={{fontFamily: 'Montserrat'}}/>
          <YAxis style={{fontFamily: 'Montserrat'}}/>
        </XYPlot>
        <button
          onClick={() => this.handleDataSelect('default')}>
          Default
        </button>
        <button
          onClick={() => this.handleDataSelect('Entire home/apt')}>
          By Entire Home/Apt
        </button>
        <button
          onClick={() => this.handleDataSelect('Private room')}>
          By Private Room
        </button>
        <button
          onClick={() => this.handleDataSelect('Shared room')}>
          By Shared Room
        </button>
      </div>
    );
  }
}
