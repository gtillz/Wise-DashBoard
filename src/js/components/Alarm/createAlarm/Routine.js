import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white, blueGrey50, blueGrey300, deepOrange300, } from 'material-ui/styles/colors';
import TimePicker from 'material-ui/TimePicker';

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

    render() {

        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <TimePicker
                            id={'routine'}
                            autoOk={ true }
                            minutesStep={ 5 }
                            inputStyle={{ textAlign: 'center' }}
                        />
                    </div>
                </MuiThemeProvider>  
            </div>
        )
    }
}