import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

// import axios from 'axios'

const google = window.google;

const muiTheme = getMuiTheme({
    palette: {
      textColor: white,
      primary1Color: white
    },
  });

export default class Destination extends Component {
    constructor(){
        super();

        this.state = {
            value: ''
        }
    }
    initAutocomplete = () => {
        const {onSelectAnswer} = this.props;

        const destinationInput = document.getElementById(`destination`);
        const autocomplete = new google.maps.places.Autocomplete((destinationInput), {
            // types: ['geocode'],
        });

        google.maps.event.clearInstanceListeners(destinationInput);
        
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            
            const  destination = {
                    address: place.formatted_address,
                    lat:     place.geometry.location.lat(),
                    lng:     place.geometry.location.lng(),
                }

            //change question after place is selected
            onSelectAnswer(destination)
        })
    }

    componentDidMount() {
        this.initAutocomplete();

    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div>
                        <TextField
                            name='destination'
                            hintText="Ex. your work address"
                            floatingLabelText='Destination'
                            id='destination'
                            placeholder=''
                            style={{width: '75%'}}  
                        /><br />
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

Destination.PropTypes = {
    onSelectAnswer: PropTypes.func.isRequired,
    currentLocation: PropTypes.object.isRequired,

}