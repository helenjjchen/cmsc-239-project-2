import React, {Component} from 'react';

import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalRectSeries, VerticalBarSeries, Hint} from 'react-vis';
import {  groupByVal, fixDict} from '../utils';
import Select from 'react-select';

export default class RatingsHist extends Component {
  constructor(props) {
    super(props);
    const {data} = this.props;
    const groupHoodRatingsData = groupByVal(data);
    const dropdownOptions = Object.keys(groupHoodRatingsData).map((hoodName) => {
      const entry = {value: hoodName, label: hoodName};
      return entry;
    });
    this.state = {
      gHoodData: groupHoodRatingsData,
      dropdown: dropdownOptions,
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
    const {gHoodData, selectedHood, selectedBar, dropdown} = this.state;
    const selectedHistData = fixDict(gHoodData[selectedHood]);
    return (
      <div>
        <h2>Distribution of Ratings — {selectedHood} </h2>
        <div className={'center flex'}>
          <XYPlot
            stackBy="y"
            width={700}
            height={450}
            margin={{bottom: 70}}
          >
            <HorizontalGridLines />
            <VerticalRectSeries
              animation
              data={selectedHistData}
              onValueMouseOver={(datapoint, e) => this.handleMouseOver(datapoint)}
              onSeriesMouseOut={() => this.handleMouseOut()}/>
            {selectedBar !== false && <Hint value={selectedBar} className="medHint">
              <div>
                <div className={'hint-text-bold'}>{`listings rated ${selectedBar.x -.4}`}</div>
                <div className={'hint-text'}>
                  {selectedBar.y}
                </div>
              </div>
            </Hint>}
            <XAxis title="Rating out of 100" style={{fontFamily: 'Montserrat'}}/>
            <YAxis style={{fontFamily: 'Montserrat'}}/>
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
