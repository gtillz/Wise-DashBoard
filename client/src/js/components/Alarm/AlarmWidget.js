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
      localTime: {
        LT: moment(moment(), ["h:mm A"]).format("h:mm"),
        ampm: moment(moment(), ["h:mm A"]).format("a")
      },
      date: moment().format('LL')
    };
  };

  
  componentWillMount() {
    this.clock();
  }
  
  clock = ()=> {
    let now = moment();
    setTimeout(()=>{
      this.setState({
        localTime: {
          LT: moment(now, ["h:mm A"]).format("h:mm"),
          ampm: moment(now, ["h:mm A"]).format("a")
      }
      },this.clock())
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
    const {isActive} = this.props;

    if(isActive){
      this.setState({
        createAlarm: !this.state.createAlarm
      })
    } else {
      alert('Internet Access Required')
    }
  }

  handleDelete = (index)=> {
    const {alarms} = this.state;
    
    const newAlarms = alarms.filter((alarm)=>{
      return alarm !== alarms[index]
    })

    this.setState({
      alarms: newAlarms
    })

  }
    
    render() {
      const {currentLocation} = this.props
      const {alarms, createAlarm, localTime, date} = this.state;
      const {LT, ampm} = localTime;

        return (
        
        <div className="container-fluid">
          <div className='row scrollable'>
            <div className='col-md-4 alarm-main'>
              <div className='alarm-btn-add'>
                <i className="fa fa-plus-square-o fa-lg" aria-hidden="true" onClick={this.handleAddAlarm}></i>
              </div>
              <div className='time'>
                <span>{LT}</span>
                <span style={{fontSize: '0.6em'}}>{` ${ampm}`}</span>
              </div>
              <div className='date'>{date}</div>
            </div>

            <AlarmList alarms={alarms} 
                       createAlarm={createAlarm}
                       handleAddAlarm={this.handleAddAlarm}
                       handleDelete={this.handleDelete}
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
  isActive: PropTypes.bool.isRequired,
}
