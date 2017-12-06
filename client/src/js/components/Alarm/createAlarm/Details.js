import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

import muiThemeable from 'material-ui/styles/muiThemeable';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12
}

class Details extends Component {

    selectDetailElement = (elementType) => {
        const {allAnswers} = this.props;
        const isHour = (allAnswers[2].value >= 1);
        const renderDetail = {
            'destination': <span className='details-answer'>{allAnswers[0].address}</span>,
            'arrival'    : <span className='details-answer'>{moment.unix(allAnswers[1]).format('LLLL')}</span>,
            'routine'    : <span className='details-answer'>{`${isHour ? allAnswers[2].value : allAnswers[2].value * 60} ${isHour ? (allAnswers[2].value === 1) ? 'hour' : 'hours' : 'minutes'}`}</span>
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

    onSubmit = ()=> {
        const {handleSetAlarm, clearState, allAnswers, trafficResults} = this.props;
        //sets alarm
        handleSetAlarm(allAnswers, trafficResults);
        
        //clears createAlarm State 
        clearState();

    }

    render() {
        const {allQuestions, error, trafficResults, alarms, clearState} = this.props;
        const isDisabled = error || this.isEmpty(trafficResults);
        return (
            <div>
                <h5 style={{color: this.props.muiTheme.palette.headerColor}}>{<span>{moment(alarms.length + 1, ['DDD']).format('DDDo')}</span>} Alarm Details</h5>
                <ol>
                    {
                        !error ?
                        allQuestions.map((each, index)=>{
                            return <li key={each.question}><span>{each.question}</span><br/>{this.selectDetailElement(allQuestions[index].elementType)}</li>
                        })
                        :
                        <p>Oops... Something went wrong.</p>
                    }
                </ol>
                
                { !error ?
                    <RaisedButton label={'Set Alarm'} primary={true} onClick={this.onSubmit} disabled={isDisabled}/>
                    :
                    <RaisedButton label={'Try Again'} primary={true} onClick={clearState} style={style}/>
                }
            </div>
        )
    }
}

Details.propTypes = {
    alarms: PropTypes.array.isRequired,
    allQuestions:   PropTypes.array.isRequired,
    handleSetAlarm: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    trafficResults: PropTypes.object,
    clearState: PropTypes.func.isRequired,
}

export default muiThemeable()(Details);

