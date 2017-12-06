import React, { Component } from 'react'
import PropTypes from 'prop-types'

import muiThemeable from 'material-ui/styles/muiThemeable';
import TextField from 'material-ui/TextField';

let google = window.google || null;

class Destination extends Component {
    constructor(){
        super();

        this.state = {
            value: ''
        }
    }

    componentDidMount() {
        const {onSelectAnswer} = this.props;
        
        const destinationInput = document.getElementById(`destination`);
        const autocomplete = new google.maps.places.Autocomplete((destinationInput), {
                // types: ['geocode'],
        });
        
        //clear instance causing a glitch temporarily disabled until fix found 
        // google.maps.event.clearInstanceListeners(destinationInput);
                
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

    render() {
        return (
            <div>
                    <div>
                        <TextField
                            name='destination'
                            hintText="Ex. your work address"
                            floatingLabelText='Destination'
                            floatingLabelStyle={{color:'white'}}
                            id='destination'
                            placeholder=''
                            style={{margin: '0.5em', width: '75%'}}  
                        /><br />
                    </div>
            </div>
        )
    }
}

Destination.PropTypes = {
    onSelectAnswer: PropTypes.func.isRequired,
    currentLocation: PropTypes.object.isRequired,

}

export default muiThemeable()(Destination);