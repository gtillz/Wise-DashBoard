import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import muiThemeable from 'material-ui/styles/muiThemeable';
import TimePicker from 'material-ui/TimePicker';

class Arrival extends Component {
    constructor(props){
        super(props);

        this.state = {
            arvTime:{
                initial: {},
                UTC: ''
            }
        }
    }

    handleTime = (e, payload) => {
        const {onSelectAnswer}  = this.props;
       
        const now = moment().valueOf()
        const desiredArv = moment(payload).valueOf()
        
        const offSet = moment(payload).utcOffset()
        const fromUTC = moment.utc(desiredArv).local();

        if (desiredArv <= now) {
            const tomorrow = moment(moment(moment((moment(fromUTC).utcOffset(offSet))).toArray()).add(1, 'days')).toISOString()
            const tomorrowUTC = moment(tomorrow).unix();
            
            this.setState({
                arvTime:{
                    initial: payload,
                    UTC: tomorrowUTC
                }
            }, onSelectAnswer(tomorrowUTC) )

        } else {
            const todayUTC = moment(fromUTC).unix();
    
            this.setState({
                arvTime:{
                    initial: payload,
                    UTC: todayUTC
                }
            }, onSelectAnswer(todayUTC))
        }
    }

    render() {
        const {arvTime} = this.state;

        return (
            <div>
                <TimePicker
                    id='desiredArrival'
                    autoOk={ true }
                    minutesStep={ 5 }
                    inputStyle={{textAlign: 'center' }}
                    textFieldStyle={{margin: '2em'}}
                    value={arvTime.initial}
                    onChange={this.handleTime}
                />
            </div> 
        )
    }
}

Arrival.PropTypes = {
    onSelectAnswer: PropTypes.func.isRequired,
}

export default muiThemeable()(Arrival);