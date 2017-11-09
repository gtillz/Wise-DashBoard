import React, { Component } from 'react';
import './styles/App.css';
import './styles/Alarm.css';

import AlarmWidget from './js/components/Alarm/AlarmWidget';

const google = window.google;

class App extends Component {
  constructor(){
    super();
    
    this.state= {
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
        const city = `${results[0].address_components[2].long_name}, ${results[0].address_components[5].short_name}`
        
        this.setState({
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
    const {currentLocation} = this.state;
    const isLoadingLocation = currentLocation.city === '';
    const {city} = currentLocation;
    return (
      <div>
          <div className="container-fluid bg-image">
            <div className='row'>
              <div className='col'>
                <h1>Wise</h1>
                <label>{isLoadingLocation ? 'Loading...' : city}</label>
              </div>
            </div> 
          </div>
          <AlarmWidget currentLocation={currentLocation}/>
      </div>
    );
  }
}

export default App;
