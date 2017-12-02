import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

function AlarmCard({alarms, index, handleDelete}) {
    const trafficConditions = (alarms[index].inTraffic > alarms[index].ballpark) ? 'Heavy' : (alarms[index].inTraffic < alarms[index].ballpark) ? 'Light' : 'Normal';
    const wakeUp = alarms[index].time;
    const departure = alarms[index].time + alarms[index][2].value * 3600;

    return (
        <div className={`col-sm-6 col-lg-4 alarm-card`}>
            <div className='actions'>
                <i className="fa fa-trash-o"         aria-hidden="true" style={{float:'right', marginTop: '0.8em'}} onClick={()=>handleDelete(index)}></i>
                <i className="fa fa-pencil-square-o" aria-hidden="true" style={{float:'left', marginTop: '0.8em'}}></i>
            </div>
            <div className='time'>
                <span>{moment.unix(wakeUp, ["h:mm A"]).format("h:mm")}</span>
                <span style={{fontSize: '0.4em'}}> {moment.unix(wakeUp, ["h:mm A"]).format("a")}</span>
            </div>  
            <div className='details'>
                <span id='traffic'>Traffic: {trafficConditions}</span><br/>
                <span id='departure'>Leave by: {moment.unix(departure).format('LT')}</span>
            </div>       
        </div>
    )
}

AlarmCard.PropTypes = {
        alarms: PropTypes.array,
        index: PropTypes.number,
        handleDelete: PropTypes.func.isRequired,
    }

export default AlarmCard
