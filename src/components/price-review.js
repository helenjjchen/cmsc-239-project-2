import React, {Component} from 'react';
import {Hint, XYPlot, XAxis, YAxis, HorizontalGridLines, MarkSeries} from 'react-vis';

import {groupBy, formatScatterData} from '../utils';

export default class PriceReview extends Component {
	constructor(props) {
	    super(props);
	    const {data} = this.props;
	    const gHoodData = groupBy(data, 'neighbourhood_cleansed');
	    console.log(gHoodData);
	    this.state = {
	    	gHoodData
	    };
 	}

 	render() {
 		const {gHoodData} = this.state;
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
		        data={scatterData}/>
		       <XAxis />
		       <YAxis />
		    </XYPlot>
		  );
 		
 	}
}