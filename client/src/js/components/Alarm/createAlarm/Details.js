import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

export default class Details extends Component {
    
    selectDetailElement = (elementType) => {
        const {allAnswers} = this.props;
        const isHour = (allAnswers[2].value >= 1);

        const renderDetail = {
            'destination': <span>{allAnswers[0].address}</span>,
            'arrival'    : <span>{moment(allAnswers[1]).format('LLLL')}</span>,
            'routine'    : <span>{`${isHour ? allAnswers[2].value : allAnswers[2].value * 60} ${isHour ? (allAnswers[2].value === 1) ? 'hour' : 'hours' : 'minutes'}`}</span>
        }
        
        return renderDetail[elementType]

    }

    isEmpty = (myObject) =>{
        for(var key in myObject) {
            if (myObject.hasOwnProperty(key)) {
                return false;
            }
        }
    
        return true;
    }

    render() {
        const {allQuestions, handleSetAlarm, allAnswers, error, trafficResults} = this.props;
        const isDisabled = error || this.isEmpty(trafficResults);
        return (
            <div>
                <h5>Alarm Details</h5>
                <ol>
                    {
                        !error ?
                        allQuestions.map((each, index)=>{
                            return <li key={each.question}><span>{each.question}</span><br/>{this.selectDetailElement(allQuestions[index].elementType)}</li>
                        })
                        :
                        <p>An error has occurred... Please try again.</p>
                    }
                </ol>
                <button onClick={()=> handleSetAlarm(allAnswers, trafficResults)} disabled={isDisabled}>Set</button>
            </div>
        )
    }
}

Details.propTypes = {
    allQuestions:   PropTypes.array.isRequired,
    handleSetAlarm: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    trafficResults: PropTypes.object,
}

