import React from 'react'
import PropTypes from 'prop-types'

import AlarmCard from './AlarmCard'
import CreateAlarm from './createAlarm/CreateAlarm'

function AlarmList({alarms, createAlarm, handleAddAlarm, currentLocation, handleSetAlarm, handleDelete}) {
    let sortAlarms = alarms.sort((a,b)=>{
        return (a.time - b.time)
    })
    return (
        <div className='col-md-8 scrollable'>
            <div className='row'>
                {
                 createAlarm ? <CreateAlarm
                                    alarms={alarms}
                                    createAlarm={createAlarm}
                                    handleSetAlarm={handleSetAlarm}
                                    currentLocation={currentLocation}
                                />
                :
                  alarms.length !== 0 ?
                    sortAlarms.map((alarm, index)=> {
                    return <AlarmCard key={index} index={index} alarms={alarms} handleDelete={handleDelete}/> 
                  })

                  :

                  <div className='no-alarms'>
                    <div className='alarm-list-img'>
                      <i className="fa fa-clock-o fa-5x" onClick={handleAddAlarm} aria-hidden="true"></i>
                    </div>
                    <span className='no-alarms-msg'>You Have No Alarms</span>
                  </div>
                  
                }
            </div>
        </div>
    )
}

AlarmList.PropTypes = {
    alarms: PropTypes.array.isRequired,
    createAlarm: PropTypes.bool.isRequired,
    handleAddAlarm: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleSetAlarm: PropTypes.func.isRequired,
    currentLocation: PropTypes.object.isRequired,
}

export default AlarmList
