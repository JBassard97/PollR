import React, { useState } from 'react';
import {XYPlot, XAxis, YAxis, VerticalBarSeries, } from 'react-vis';

import '../../App.css';
import '../../../../node_modules/react-vis/dist/style.css'


const Graph = ({poll}) => {

    const pollData = poll.data.map((data) => {
        return {x: data.choices.text,
        y: data.voteCount}
    })

    if (loading) {
        return <div>Loading...</div>
    }
    
    return (
        <div>
            <XYPlot 
                width={300} 
                height={250}>
            <XAxis/>
            <YAxis title="Number of votes"/>
            <VerticalBarSeries 
                data={pollData} 
                style={{ color: 'red'}}/>
            </XYPlot>  
        </div>
    );
};

export default Graph;

