import React, {Component} from 'react';

import {Hint, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, ChartLabel} from 'react-vis';

function groupBy(data, key) {
  return data.reduce((acc, row) => {
    if (!acc[row[key]]) {
      acc[row[key]] = [];
    }
    acc[row[key]].push(row);
    return acc;
  }, {});
}

export default class StackedBar extends Component {
  constructor() {
    super();
    this.state = {
      selectedHood: false,
      selectedRoomData: null
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleMouseOver(datapoint, roomData) {
    const roomTypes = Object.keys(roomData[datapoint.x]);
    const rData = roomTypes.map(roomType => {
      const entry = {};
      entry[roomType] = roomData[datapoint.x][roomType].length;
      return entry;
    });
    this.setState({
      selectedHood: datapoint,
      selectedRoomData: rData
    });
  }

  render() {
    // const {data} = this.props;
    // const preppedData = Object.entries(groupBy(data, keyOfInterest)).map(([key, values]) => {
    //   return {key, size: values.length};
    // });
    const {selectedHood, selectedRoomData} = this.state;
    const {data} = this.props;
    const gHoodData = groupBy(data, 'neighbourhood_cleansed');
    let items = Object.keys(gHoodData).map(k => {
      return [k, gHoodData[k].length];
    });
    items.sort((first, second) => {
      return second[1] - first[1];
    });
    items = items.slice(0, 20);
    const roomData = {};
    items.forEach(d => {
      const gRmTypeData = groupBy(gHoodData[d[0]], 'room_type');
      roomData[d[0]] = gRmTypeData;
    });
    const roomTypes = ['Shared room', 'Private room', 'Entire home/apt'];
    const barsData = roomTypes.reduce((barData, roomType) => {
      barData[roomType] = Object.keys(roomData).map(hood => {
        const roomTypeData = roomData[hood][roomType];
        const entry = {};
        entry.x = hood;
        entry.y = (typeof roomTypeData !== 'undefined') ? roomTypeData.length : 0;
        return entry;
      });
      return barData;
    }, {});
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
          <VerticalBarSeries
            data={barsData[roomTypes[0]]}
            onValueMouseOver={(datapoint, e) => this.handleMouseOver(datapoint, roomData)}/>
          <VerticalBarSeries
            data={barsData[roomTypes[1]]}
            onValueMouseOver={(datapoint, e) => this.handleMouseOver(datapoint, roomData)}/>
          <VerticalBarSeries
            data={barsData[roomTypes[2]]}
            onValueMouseOver={(datapoint, e) => this.handleMouseOver(datapoint, roomData)}/>
          {selectedHood !== false && <Hint value={selectedHood}>
            <div>
              <div className={'hint-text'}>{selectedHood.x}</div>
              {selectedRoomData.map(d => {
                const roomType = Object.keys(d)[0];
                const listingCount = Object.values(d)[0];
                return (
                  <div className={'hint-text'}>
                    {`${roomType}: ${listingCount}`}
                  </div>
                );
              })}
            </div>
          </Hint>}
          <XAxis tickLabelAngle={-45} style={{fontFamily: 'Montserrat'}}/>
          <YAxis />
        </XYPlot>
      </div>
    );
  }
}
