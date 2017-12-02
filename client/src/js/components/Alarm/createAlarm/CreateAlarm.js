import React, { Component } from 'react'
import PropTypes from 'prop-types'
import data from '../../../data/Data'
import axios from 'axios'

import Destination from './Destination'
import Arrival from './Arrival'
import Routine from './Routine'
import Question from './Question'
import ProgressBar from './ProgressBar'
import Details from './Details'

export default class CreateAlarm extends Component {
    constructor(){
        super();

        this.state = {       
            allAnswers: [],
            allQuestions: data.allQuestions,
            currentQuestion: data.allQuestions[0],
            error: false,
            loadNextQuestion: false,
            progress: 0,
            showDetails: false,
            trafficResults: {}
        }
    }

    selectElementType = (elSelect) => {
        const {currentLocation} = this.props;
        const elementType = {
            'destination' : <Destination onSelectAnswer={this.onSelectAnswer} currentLocation={currentLocation}/>,
            'arrival'     : <Arrival     onSelectAnswer={this.onSelectAnswer}/>,
            'routine'     : <Routine     onSelectAnswer={this.onSelectAnswer}/>
        }

       return elementType[elSelect]

    }

    findTraffic = () => {
        const {allAnswers} = this.state;
        const {currentLocation} = this.props;
        const alarmData = {
            currentLocation: currentLocation,
            destination: allAnswers[0],
            ETA: allAnswers[1]
        }
        
        axios.post('http://localhost:8080/set', alarmData)
        .then(result=>{
            let ballpark  = result.data.rows[0].elements[0].duration.value;
            let inTraffic = result.data.rows[0].elements[0].duration_in_traffic.value;
            
            this.setState({
                trafficResults:{
                  ballpark: ballpark, 
                  inTraffic: inTraffic}
            })

        }).catch(err=>{
            this.setState({
                error: true
            })
        })
    }

    onSelectAnswer = (answer) => {
        const {allAnswers, progress} = this.state;
        const currentAnswer = allAnswers[progress];

        if(currentAnswer){
            allAnswers[progress] = answer            
            this.setState({
                allAnswers
              }, this.NextQuestion())
            
        } else {
            this.setState({
                allAnswers: [...allAnswers, answer]
            }, this.NextQuestion())
        }
    }

    NextQuestion = () => {
        const {allQuestions, progress} = this.state;
        
        setTimeout(()=>{
            this.setState({
                loadNextQuestion: true,
            })
        },300)
        
        setTimeout(()=>{
          if(progress < allQuestions.length - 1){
            this.setState({
              progress: progress + 1,
              currentQuestion: allQuestions[progress + 1],
              loadNextQuestion: false
            })

          } else {
            this.setState({
              loadNextQuestion: false,
              showDetails: true,
            })
          }
        }, 600)

        if(progress === 2){
            this.findTraffic()
        }
        
    }

    clearState = ()=> {
        console.log('clearing state')
        this.setState({
            allAnswers: [],
            allQuestions: data.allQuestions,
            currentQuestion: data.allQuestions[0],
            error: false,
            loadNextQuestion: false,
            progress: 0,
            showDetails: false,
            trafficResults: {}
        })
    }

    render() {
        const {currentQuestion, showDetails, allQuestions, allAnswers, error, trafficResults, loadNextQuestion, progress} = this.state;
        const {handleSetAlarm} = this.props;

        return (
            <div className='alarm-form'>
                <ProgressBar allQuestions={allQuestions}
                             allAnswers={allAnswers}
                             progress={progress}
                />
                <div className='content'>               
                    {
                    !showDetails ? <Question
                        currentQuestion={currentQuestion}
                        selectElementType={this.selectElementType}
                        loadNextQuestion={loadNextQuestion}
                    />
                    :
                    <Details allQuestions={allQuestions}
                             allAnswers={allAnswers}
                             handleSetAlarm={handleSetAlarm}
                             error={error}
                             trafficResults={trafficResults}
                             clearState={this.clearState}
                    />
                    }
                </div>

                <div className='navigation'>
                </div>
            </div>
        )
    }
}

CreateAlarm.propTypes = {
    createAlarm: PropTypes.bool.isRequired,
    handleSetAlarm: PropTypes.func.isRequired,
    currentLocation: PropTypes.object.isRequired,
}
