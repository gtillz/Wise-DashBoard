import React, { Component } from 'react';
import './css/App.css';
import './css/Alarm.css';

import AlarmWidget from './js/components/Alarm/AlarmWidget';

class App extends Component {
  constructor(){
    super();
    
    this.state= {
      currentLocation: {
        lat: '',
        lng: ''
      }

    }
  }

  
  componentDidMount() {
    navigator.geolocation.watchPosition((position)=>{
      this.setState({
        currentLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    })

  }
  
  
  render() {
    return (
      <div>
          <div className="container-fluid bg-image">
            <div className='row'>
              <div className='col'>
                <h1>Wise</h1>
                <label>Toronto, ON</label>
              </div>
            </div> 
          </div>
          <AlarmWidget/>
      </div>
    );
  }
}

export default App;
