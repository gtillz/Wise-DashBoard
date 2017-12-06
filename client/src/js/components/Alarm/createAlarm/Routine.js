import React, { Component } from 'react'
import PropTypes from 'prop-types'

import muiThemeable from 'material-ui/styles/muiThemeable';
import Slider from 'material-ui/Slider'

class Routine extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            routine: {
                value: 1
            }
        }
    }
    onChange = (e, payload) => {
        this.setState({
            routine: {
                value: payload,
            }
        })
    }

    render() {
        const {onSelectAnswer} = this.props;
        const {routine} = this.state;
        const isHour = (routine.value >= 1);
        return (
            <div className='slider-container'>
                <h6>{`${isHour ? routine.value : routine.value * 60} ${isHour ? (routine.value === 1) ? 'hour' : 'hours' : 'minutes'}`}</h6>
                <Slider
                    style={{margin: '1em auto', width: '75%'}}
                    min={0}
                    max={2}
                    step={25/100}
                    defaultValue={1}
                    value={routine.value}
                    onChange={this.onChange}
                    onDragStop={()=> onSelectAnswer(routine)}
                />
            </div>
        )
    }
}

Routine.PropTypes = { 
    onSelectAnswer: PropTypes.func.isRequired,
}

export default muiThemeable()(Routine);