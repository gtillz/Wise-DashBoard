import React from 'react'
import PropTypes from 'prop-types'

import AlarmCard from './AlarmCard'
import CreateAlarm from './createAlarm/CreateAlarm'

AlarmList.PropTypes = {
    alarms: PropTypes.array.isRequired,
    createAlarm: PropTypes.bool.isRequired,
    handleAddAlarm: PropTypes.func.isRequired,
}

function AlarmList({alarms, createAlarm, handleAddAlarm}) {
    return (
        <div className='col-md-8 scrollable'>
            <div className='row'>
                {
                 createAlarm ? <CreateAlarm handleAddAlarm={handleAddAlarm}
                                             createAlarm={createAlarm}
                                />
                :
                
                  alarms.length !== 0 ?
                    alarms.map((alarm, index )=> {
                    return <AlarmCard key={index} alarms={alarms}/> 
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
}

export default AlarmList
