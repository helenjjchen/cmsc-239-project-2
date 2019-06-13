import React, {Component} from 'react';
import {Hint, XYPlot, XAxis, YAxis, HorizontalGridLines, MarkSeries} from 'react-vis';
import {format} from 'd3-format';
import {groupBy, formatScatterData, formatScatterData2, formatScatterData3,
  getMedReviewForListings, getMaxReviews} from '../utils';

export default class PriceReview extends Component {
    constructor(props) {
        super(props);
        const {data} = this.props;
        const gHoodData = groupBy(data, 'neighbourhood_cleansed');
        const yearData = groupBy(data, 'first_year');
        const scatterData = formatScatterData(gHoodData);
        const minData = formatScatterData2(gHoodData);
        const maxData = formatScatterData3(gHoodData);
        this.state = {
            data: scatterData,
            scatterData,
            minData,
            maxData,
            selectedHood: false
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

  handleMouseOver(datapoint) {
    console.log(datapoint);
    this.setState({
      selectedHood: datapoint
    });
  }

  handleMouseOut() {
    this.setState({
      selectedHood: false
    });
  }

  handleDataSelect(plotType) {
    if (plotType === 'Median') {
      this.setState({
        data: this.state.scatterData
      });
    } else if (plotType === 'Min') {
      this.setState({
        data: this.state.minData
      });
    } else {
      this.setState({
        data: this.state.maxData
      });
    }
  }

  render() {
    const {data, selectedHood} = this.state;
    return (
      <div>
        <div>
          <XYPlot
            width={800}
            height={600}>
            <HorizontalGridLines />
            <MarkSeries
              className="mark-series-example"
              animation
              sizeRange={[2, 10]}
              data={data}
              onValueMouseOver={(datapoint, e) => this.handleMouseOver(datapoint)}
              onValueMouseOut={() => this.handleMouseOut()}/>
            {selectedHood !== false && <Hint value={selectedHood}>
              <div>
                <div className={'hint-text-bold'}>{selectedHood.name}</div>
                <div className={'hint-text'}>Median Price: {selectedHood.x}</div>
                <div className={'hint-text'}>Median Review: {selectedHood.y}</div>
                <div className={'hint-text'}>Mean No. of Reviews: {format('0.2f')(selectedHood.size)}</div>
              </div>
              </Hint>}
            <XAxis style={{fontFamily: 'Montserrat'}}/>
            <YAxis title="Median Review Score out of 100" style={{fontFamily: 'Montserrat'}}/>
          </XYPlot>
        </div>
        <div className={'center flex'}>
          <button
            onClick={() => this.handleDataSelect('Median')}>
            Median Reviews
          </button>
          <button
            onClick={() => this.handleDataSelect('Min')}>
            Minimum Reviews
          </button>
          <button
            onClick={() => this.handleDataSelect('Maximum')}>
            Maximum Reviews
          </button>
        </div>
      </div>
    );

  }
}
