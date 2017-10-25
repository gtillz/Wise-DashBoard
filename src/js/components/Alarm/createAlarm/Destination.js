import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';

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
            destination: {
                id: '',
                address: '',
                lat: '',
                lng: ''
            }
        }
    }

    static propTypes = {
        onSelectAnswer: PropTypes.func.isRequired,

    }

    initAutocomplete = () => {
        const destinationInput = document.getElementById(`destination`);
        const autocomplete = new google.maps.places.Autocomplete((destinationInput), {
            types: ['address'],
        });

        google.maps.event.clearInstanceListeners(destinationInput);
        
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
      
            this.setState({
                destination: {
                    id:      place.id,
                    address: place.formatted_address,
                    lat:     place.geometry.location.lat(),
                    lng:     place.geometry.location.lng(),
                }
            })

        })
    }

    componentDidMount() {
        this.initAutocomplete();

    }

        render() {
        // const {onSelectAnswer} = this.props;
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
