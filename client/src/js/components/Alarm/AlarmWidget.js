import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import AlarmList from './AlarmList'

export default class AlarmWidget extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      alarms: [],
      createAlarm: false,
      localTime: this.clock(),
      date: moment().format('LL')
    };
  };

  componentDidUpdate() {
    this.clock();
  }
  
  clock = ()=> {
    setTimeout(()=>{
      this.setState({
        localTime: moment().format('LT')
      })
    },500)
  }

  handleSetAlarm = (allAnswers, trafficResults) => {
    let alarm = allAnswers.reduce((obj, item, i) => {
      obj[i] = item 
      return obj
    }, {})

    const awake = {
      time: allAnswers[1] - trafficResults.inTraffic - (allAnswers[2].value * 3600),
      ballpark: trafficResults.ballpark,
      inTraffic: trafficResults.inTraffic
    }

    alarm = Object.assign(alarm, awake)

    this.setState({
      alarms: [...this.state.alarms, alarm]
    }, this.handleAddAlarm)

  }

  handleAddAlarm = () => {
    this.setState({
      createAlarm: !this.state.createAlarm
    })
  }
    
    render() {
      const {currentLocation} = this.props
      const {alarms, createAlarm, localTime, date} = this.state;

        return (
        
        <div className="container-fluid">
          <div className='row scrollable'>
            <div className='col-md-4 alarm-main'>
              <div className='alarm-btn-add'>
                <i className="fa fa-plus-square-o fa-lg" aria-hidden="true" onClick={this.handleAddAlarm}></i>
              </div>
              <div className='time'>{localTime}</div>
              <div className='date'>{date}</div>
            </div>

            <AlarmList alarms={alarms} 
                       createAlarm={createAlarm}
                       handleAddAlarm={this.handleAddAlarm}
                       handleSetAlarm={this.handleSetAlarm}
                       currentLocation={currentLocation}
            />

          </div>
        </div>
        )
    }
}

AlarmWidget.PropTypes = {
  currentLocation: PropTypes.object.isRequired,
}
