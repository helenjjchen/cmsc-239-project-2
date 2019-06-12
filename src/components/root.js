import React from 'react';
import ReactMapGL from 'react-map-gl';
import {csv} from 'd3-fetch';
import ExampleChart from './example-chart';
import StackedBar from './stacked-bar';
// import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import {formatLngLat} from '../utils'; // temporary
// var HeatmapOverlay = require('react-map-gl-heatmap-overlay');

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
        <div className={"text bottom-margin"}>{`The example data was loaded! There are ${data.length} rows`}</div>
        <h2> Room Types by Neighborhood </h2>
        <div className={"bottom-margin center"}>
          <StackedBar data={data}/>
        </div>
        <div>{longBlock}</div>
        <ExampleChart data={data}/>
        <div>{longBlock}</div>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;
