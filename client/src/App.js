import React, { Component } from 'react';
import './styles/App.css';
import './styles/Alarm.css';
import '../node_modules/react-activity/dist/react-activity.css'

import AlarmWidget from './js/components/Alarm/AlarmWidget';
import {Sentry} from 'react-activity'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {white, blueGrey50, blueGrey300, deepOrange300, deepOrange700} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
      textColor: white,
      primary1Color: deepOrange300,
      pickerHeaderColor: deepOrange300,
      canvasColor: blueGrey50,
      clockCircleColor: blueGrey300,
      headerColor: deepOrange700
  },
});

const google = window.google;

class App extends Component {
  constructor(){
    super();
    
    this.state= {
      isActive: false,
      currentLocation: {
        city: '',
        lat:  '',
        lng:  ''
      },
    }
  }

  componentDidMount() {
    navigator.geolocation.watchPosition((position)=>{
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      //using coordinates to find address
      const google_map_position = new google.maps.LatLng( lat, lng );
      const google_maps_geocoder = new google.maps.Geocoder();
      
      google_maps_geocoder.geocode({ 'latLng': google_map_position }, (results) => {
        const city = `${results[0].address_components[2].long_name}, ${results[0].address_components[5].short_name}` || null;
        
        this.setState({
          isActive: true,
          currentLocation: {
            city: city,
            lat: lat,
            lng: lng
          }
        })
      })
    })
  }
   
  render() {
    const {currentLocation, isActive} = this.state;
    const isLoadingLocation = currentLocation.city === '';
    const {city} = currentLocation;
    return (
      <div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div className="container-fluid bg-image">
            <div className='row'>
              <div className='col'>
                <h1 className='app-logo'>Wise</h1>
                <div className='app-location-container'>
                  { isLoadingLocation ?
                    <Sentry color="#FFFFFF" size={32} speed={1} />
                  :
                    <i className="fa fa-map-marker fa-5x app-location-icon" aria-hidden="true"></i>
                  }
                  <span className='app-location'>{isLoadingLocation ? `Locating...` : city}</span>
                </div>
              </div>
            </div> 
          </div>
          <AlarmWidget currentLocation={currentLocation}
                       isActive={isActive}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
