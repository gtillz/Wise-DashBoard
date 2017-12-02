import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white, blueGrey50, blueGrey300, deepOrange300, } from 'material-ui/styles/colors';
// import TimePicker from 'material-ui/TimePicker';
import Slider from 'material-ui/Slider'

const muiTheme = getMuiTheme({
    palette: {
        textColor: white,
        primary1Color: deepOrange300,
        pickerHeaderColor: deepOrange300,
        canvasColor: blueGrey50,
        clockCircleColor: blueGrey300
    },
  });

export default class Routine extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            routine: {
                value: 1
            }
        }
    }
    onChange = (e, payload) => {
        this.setState({
            routine: {
                value: payload,
            }
        })
    }

    render() {
        const {onSelectAnswer} = this.props;
        const {routine} = this.state;
        const isHour = (routine.value >= 1);
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className='slider-container'>
                        <h6>{`${isHour ? routine.value : routine.value * 60} ${isHour ? (routine.value === 1) ? 'hour' : 'hours' : 'minutes'}`}</h6>
                        <Slider
                            style={{margin: '1em auto', width: '75%'}}
                            min={0}
                            max={2}
                            step={25/100}
                            defaultValue={1}
                            value={routine.value}
                            onChange={this.onChange}
                            onDragStop={()=> onSelectAnswer(routine)}
                        />
                    </div>
                </MuiThemeProvider>  
            </div>
        )
    }
}

Routine.PropTypes = { 
    onSelectAnswer: PropTypes.func.isRequired,
}