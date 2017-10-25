import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import AlarmList from './AlarmList'

export default class AlarmWidget extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      alarms: [],
      createAlarm: false
    };
  };

  handleAddAlarm = () => {
    this.setState({
      createAlarm: true
    })
  }
    
    render() {
      const {alarms, createAlarm} = this.state;
      const date = new Date();
      const time = date.getTime()
        return (
        
        <div className="container-fluid">
          <div className='row scrollable'>
            <div className='col-md-4 alarm-main'>
              <div className='alarm-btn-add'>
                <i className="fa fa-plus-square-o fa-lg" aria-hidden="true" onClick={this.handleAddAlarm}></i>
              </div>
              <div className='time'>12:00</div>
              <div className='date'>October 11, 2017</div>
            </div>

            <AlarmList alarms={alarms} 
                      createAlarm={createAlarm}
                      handleAddAlarm={this.handleAddAlarm}
            />

          </div>
        </div>
        )
    }
}

// AlarmWidget.PropTypes = {
  
// }
