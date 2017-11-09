import React from 'react'
import PropTypes from 'prop-types'

function AlarmCard({alarms}) {
    return (
        <div className={`col-sm-6 col-lg-4 alarm-card`}>
            <div className='actions'>
                <i className="fa fa-trash-o"         aria-hidden="true" style={{float:'right', margin: '0.8em'}}></i>
                <i className="fa fa-pencil-square-o" aria-hidden="true" style={{float:'left', margin: '0.8em'}}></i>
            </div>
            <div className='time'>12:00</div>  
            <div className='details'>
                <span id='traffic'>Traffic: Normal</span><br/>
                <span id='departure'>Leave by: 6:45AM</span>
            </div>       
        </div>
    )
}

AlarmCard.PropTypes = {
        alarms: PropTypes.array,
    }

export default AlarmCard
