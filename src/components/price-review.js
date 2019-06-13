import React, {Component} from 'react';
import {Hint, XYPlot, XAxis, YAxis, HorizontalGridLines, MarkSeries} from 'react-vis';
import {format} from 'd3-format';
import {groupBy, formatScatterData} from '../utils';

export default class PriceReview extends Component {
    constructor(props) {
        super(props);
        const {data} = this.props;
        const gHoodData = groupBy(data, 'neighbourhood_cleansed');
        console.log(gHoodData);
        this.state = {
            gHoodData,
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

    render() {
        const {gHoodData, selectedHood} = this.state;
        const scatterData = formatScatterData(gHoodData);
        console.log(scatterData);
        return (
            <XYPlot
              width={800}
              height={600}>
              <HorizontalGridLines />
              <MarkSeries
                className="mark-series-example"
                sizeRange={[2, 10]}
                data={scatterData}
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
               <XAxis />
               <YAxis />
            </XYPlot>
          );
        
    }
}