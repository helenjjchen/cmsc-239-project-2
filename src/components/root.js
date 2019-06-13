import React from 'react';
import {csv} from 'd3-fetch';
import StackedBar from './stacked-bar';
import PriceBar from './price-bar';
import PriceReview from './price-review';
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

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      border: 0,
      width: 50
    }}
  />
);

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
        <div className={'subtitle flex center'}>
          By Helen Chen, William Wang, Jonathan Yuan
        </div>
        <div className={'flex centered bottom-margin-75'}>
          <ColoredLine color="#ffc2bd" />
          <p className={'intro-text'}>
            You climb out of your Uber from O’Hare weary of your surroundings. You exhale and watch as your breath crystallizes in front of you: back in Chicago and right on time for winter. Sighing, you trudge toward the house. <br/> <br/>
            All you need is a place to rest, but you’ve been tired of hotels for a long time. You open the door to your Airbnb, and you’re greeted with a card - “Bienvenidos a casa.” Last time, at your Airbnb a neighborhood away, you received a “Huānyíng huí jiā.” The time before that, at the place north of downtown, you smiled at a simple “Welcome Home.” <br/> <br/>
            You head to sleep, and thinking of all the cards you’ve read, you begin to dream questions. How have the number of Airbnb listings in Chicago changed over time? What neighborhood am I in again? Are there a lot of listings here? Is this an expensive neighborhood? Would it have been cheaper to book a different room type? Given the neighborhood, is it expensive to book a relatively well-reviewed home?
            And, as you dream, you seek answers; you begin to visualize the shape and structure of Airbnb listing data in Chicago; after all, your name is Andrew McNutt.
          </p>
          <ColoredLine color="#ffc2bd" />
        </div>

        <h2>Chicago Listings Over Time</h2>
        <div className={'bottom-margin-75'}>
          <AirbnbMap data={data}/>
          <div className={'bottom-margin'}> </div>
          <p className={'text'}>
            You climb out of your Uber from O’Hare weary of your surroundings. You exhale and watch as your breath crystallizes in front of you: back in Chicago and right on time for winter. Sighing, you trudge toward the house. <br/> <br/>
            All you need is a place to rest, but you’ve been tired of hotels for a long time. You open the door to your Airbnb, and you’re greeted with a card - “Bienvenidos a casa.” Last time, at your Airbnb a neighborhood away, you received a “Huānyíng huí jiā.” The time before that, at the place north of downtown, you smiled at a simple “Welcome Home.” <br/> <br/>
            You head to sleep, and thinking of all the cards you’ve read, you begin to dream questions. How have the number of Airbnb listings in Chicago changed over time? What neighborhood am I in again? Are there a lot of listings here? Is this an expensive neighborhood? Would it have been cheaper to book a different room type? Given the neighborhood, is it expensive to book a relatively well-reviewed home?
            And, as you dream, you seek answers; you begin to visualize the shape and structure of Airbnb listing data in Chicago; after all, your name is Andrew McNutt.
          </p>
        </div>

        <h2> Room Types by Neighborhood </h2>
        <div className={'bottom-margin-75'}>
          <StackedBar data={data}/>
        </div>

        <PriceBar data={data}/>

        <h2> Median Price versus Review </h2>
        <PriceReview data={data}/>
        <RatingsHist data={data}/>
        <div>{longBlock}</div>
        <div className={'bottom-margin-75'}> </div>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
