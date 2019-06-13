import React from 'react';
import {csv} from 'd3-fetch';
import StackedBar from './stacked-bar';
import PriceBar from './price-bar';
import PriceReview from './price-review';
import ExampleChart from './example-chart';
// import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import {formatLngLat} from '../utils'; // temporary
// var HeatmapOverlay = require('react-map-gl-heatmap-overlay')
import AirbnbMap from './map';
import RatingsHist from './ratings-hist';

const longBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

class RootComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: true
    };
  }

  componentWillMount() {
    csv('data/chicago_data.csv')
      .then(data => {
        this.setState({
          data,
          loading: false
        });
      });
  }

  render() {
    const {loading, data} = this.state;
    // console.log(data);
    const test = formatLngLat(data);
    // console.log(test);
    if (loading) {
      return <h1>LOADING</h1>;
    }
    return (
      <div className="relative">

        <h1> Airbnb in Chicago </h1>
        <div className={'text bottom-margin'}>
          {`The example data was loaded! There are ${data.length} rows`}
        </div>
        <h2>Dope ass map</h2>
        <AirbnbMap data={data}/>
        <h2> Room Types by Neighborhood </h2>
        <div className={'bottom-margin center'}>
          <StackedBar data={data}/>
        </div>
        <div>{longBlock}</div>
        <PriceBar data={data}/>
        <ExampleChart data={data}/>
        <h2> Median Price versus Review </h2>
        <PriceReview data={data}/>
        <RatingsHist data={data}/>
        <div>{longBlock}</div>
        <div className={'bottom-margin-100'}> </div>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
