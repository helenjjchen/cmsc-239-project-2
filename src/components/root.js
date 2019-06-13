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
      width: 25
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
          <ColoredLine color="#ffc2bd" />

          <p className={'intro-text'}>
            You climb out of your Uber from O’Hare weary of your surroundings. You exhale and watch as your breath crystallizes in front of you: back in Chicago and right on time for winter. Sighing, you trudge toward the house. <br/> <br/>
            All you need is a place to rest, but you’ve been tired of hotels for a long time. You open the door to your Airbnb, and you’re greeted with a card - “Bienvenidos a casa.” Last time, at your Airbnb a neighborhood away, you received a “Huānyíng huí jiā.” The time before that, at the place north of downtown, you smiled at a simple “Welcome Home.” <br/> <br/>
            You head to sleep, and thinking of all the cards you’ve read, you begin to dream questions. How have the number of Airbnb listings in Chicago changed over time? What neighborhood am I in again? Are there a lot of listings here? Is this an expensive neighborhood? Would it have been cheaper to book a different room type? Given the neighborhood, is it expensive to book a relatively well-reviewed home?
            And, as you dream, you seek answers; you begin to visualize the shape and structure of Airbnb listing data in Chicago; after all, your name is Andrew McNutt.
          </p>
          <ColoredLine color="#ffc2bd" />
          <ColoredLine color="#ffc2bd" />

        </div>

        <h2>Chicago Listings Over Time</h2>
        <AirbnbMap data={data}/>
        <div className={'bottom-margin-75'}>
          <div className={'bottom-margin'}> </div>
          <div className={'flex centered'}>
            <ColoredLine color="#ffc2bd" />
            <p className={'text'}>
              As shown above, Airbnb listings in Chicago have grown exponentially since 2009, a year marking Airbnb’s fresh start out of Y Combinator. In the past decade, Chicago has seen listings grow from a mere two homes to over 7000.  From 2009 to 2015, listings north of downtown dominated growth, with only a sparse handful of listings nearer to the South Side. However, from 2016 to present, we see a trend wherein listings have spread further into Chicago’s famous neighborhoods, expanding outside the confines of the northern suburbs and reaching into communities ripe with ethnic charm and contemporary relevance. Of course, listings continue to consolidate heavily in the downtown and Loop-surrounding areas. Thus, we see that the epicenter of downtown is a powerful market opportunity for Airbnb hosts; tourists are still eager to experience the vibrancy at the heart of the Windy City. <br/><br/>
              As an interesting note, after explosive growth in 2017, we see a downturn in growth rate for listings for part of 2018 due to regulation from Chicago’s Department of Business Affairs and Consumer Protection which <a href={'https://www.fastcompany.com/90218765/airbnb-regulation-pain-hits-chicago-as-city-threatens-to-reject-1200-hosts'}>required licenses for people renting out rooms for less than 30 days</a>.
                However, after the initial shock of the legislation and with more corporate support in place, Airbnb listings growth has begun to recover.
            </p>
          </div>
        </div>

        <h2> Room Types by Neighborhood </h2>
        <div className={'bottom-margin-75'}>
          <StackedBar data={data}/>
          <div className={'bottom-margin-30'}> </div>
          <div className={'flex centered'}>
            <ColoredLine color="#ffc2bd" />
            <p className={'text'}>
              You climb out of your Uber from O’Hare weary of your surroundings. You exhale and watch as your breath crystallizes in front of you: back in Chicago and right on time for winter. Sighing, you trudge toward the house. <br/> <br/>
              All you need is a place to rest, but you’ve been tired of hotels for a long time. You open the door to your Airbnb, and you’re greeted with a card - “Bienvenidos a casa.” Last time, at your Airbnb a neighborhood away, you received a “Huānyíng huí jiā.” The time before that, at the place north of downtown, you smiled at a simple “Welcome Home.” <br/> <br/>
              You head to sleep, and thinking of all the cards you’ve read, you begin to dream questions. How have the number of Airbnb listings in Chicago changed over time? What neighborhood am I in again? Are there a lot of listings here? Is this an expensive neighborhood? Would it have been cheaper to book a different room type? Given the neighborhood, is it expensive to book a relatively well-reviewed home?
              And, as you dream, you seek answers; you begin to visualize the shape and structure of Airbnb listing data in Chicago; after all, your name is Andrew McNutt.
            </p>
          </div>
        </div>

        <PriceBar data={data}/>
        <div className={'bottom-margin-30'}> </div>
        <div className={'bottom-margin-75'}>
          <div className={'flex centered'}>
            <ColoredLine color="#ffc2bd" />
            <p className={'text'}>
              The visualization shows the median price for each room type (entire house/apartment, private room, shared room) for a particular neighborhood. The general trend is as expected. Renting an entire home is generally more expensive than renting a private room which in turn is more expensive than renting a shared room. However, there are a few interesting neighbourhoods to view. For instance, even looking at Lake View’s graph is enough to freeze one’s bank account. With a median price of over $1000/night to book an entire house, one might be better served saving for a year and buying their own home. But, with that said, the experience is always priceless. <br/><br/>
              Interestingly enough, the median price for a private room in Hyde Park is more than the median price for an entire home/apartment! Perhaps over a century of deep economic thought has put a spin on the economic dynamics within Hyde Park. This odd trend is also present in cities like Portage Park, Kenwood, and Rogers Park. In fact, in Humboldt Park, the median shared room price is higher than either of the other room types, though all three are relatively cheap. It seems that for places like Humboldt Park company is priceless as well.
            </p>
          </div>
        </div>

        <h2> Median Price versus Review </h2>
        <div className={'bottom-margin-75'}>
          <PriceReview data={data}/>
          <div className={'bottom-margin-30'}> </div>
          <div className={'flex centered'}>
            <ColoredLine color="#ffc2bd" />
            <p className={'text'}>
              The visualization shows the median price for each room type (entire house/apartment, private room, shared room) for a particular neighborhood. The general trend is as expected. Renting an entire home is generally more expensive than renting a private room which in turn is more expensive than renting a shared room. However, there are a few interesting neighbourhoods to view. For instance, even looking at Lake View’s graph is enough to freeze one’s bank account. With a median price of over $1000/night to book an entire house, one might be better served saving for a year and buying their own home. But, with that said, the experience is always priceless. <br/><br/>
              Interestingly enough, the median price for a private room in Hyde Park is more than the median price for an entire home/apartment! Perhaps over a century of deep economic thought has put a spin on the economic dynamics within Hyde Park. This odd trend is also present in cities like Portage Park, Kenwood, and Rogers Park. In fact, in Humboldt Park, the median shared room price is higher than either of the other room types, though all three are relatively cheap. It seems that for places like Humboldt Park company is priceless as well.
            </p>
          </div>
        </div>


          <RatingsHist data={data}/>
        <div className={'bottom-margin-75'}>
          <div className={'flex centered'}>
            <ColoredLine color="#ffc2bd" />
            <p className={'text'}>
              You climb out of your Uber from O’Hare weary of your surroundings. You exhale and watch as your breath crystallizes in front of you: back in Chicago and right on time for winter. Sighing, you trudge toward the house. <br/> <br/>
              All you need is a place to rest, but you’ve been tired of hotels for a long time. You open the door to your Airbnb, and you’re greeted with a card - “Bienvenidos a casa.” Last time, at your Airbnb a neighborhood away, you received a “Huānyíng huí jiā.” The time before that, at the place north of downtown, you smiled at a simple “Welcome Home.” <br/> <br/>
              You head to sleep, and thinking of all the cards you’ve read, you begin to dream questions. How have the number of Airbnb listings in Chicago changed over time? What neighborhood am I in again? Are there a lot of listings here? Is this an expensive neighborhood? Would it have been cheaper to book a different room type? Given the neighborhood, is it expensive to book a relatively well-reviewed home?
              And, as you dream, you seek answers; you begin to visualize the shape and structure of Airbnb listing data in Chicago; after all, your name is Andrew McNutt.
            </p>
          </div>
        </div>

        <div className={'flex centered bottom-margin-75'}>

          <p className={'intro-text'}>
            You awaken. Enlightened.
          </p>


        </div>
        <div className={'bottom-margin-100'}> </div>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
