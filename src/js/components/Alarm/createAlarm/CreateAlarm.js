import React, { Component } from 'react'
import PropTypes from 'prop-types'
import data from '../../../data/Data'

import Destination from './Destination'
import Arrival from './Arrival'
import Routine from './Routine'
import Question from './Question'
import ProgressBar from './ProgressBar'

export default class CreateAlarm extends Component {
    constructor(){
        super();

        this.state = {
            allQuestions: data.allQuestions,
            currentQuestion: data.allQuestions[1],
            loadNextQuestion: false,
            progress: 0,
            allAnswers: []
        }
    }

    selectElementType = (elSelect) => {
        const elementType = {
            'destination' : <Destination onSelectAnswer={this.onSelectAnswer}/>,
            'arrival'     : <Arrival     onSelectAnswer={this.onSelectAnswer}/>,
            'getReady'    : <Routine/>
        }

       return elementType[elSelect]

    }

    onSelectAnswer = (answer) => {
        const {allAnswers, progress} = this.state;
        const currentAnswer = allAnswers[progress];
        console.log('works')
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
        this.setState({
          loadNextQuestion: true
        })
        
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
              showResults: true
            })
          }
        }, 300)
      }

    
    render() {
        const {currentQuestion} = this.state;
        return (
            <div className='alarm-form'>
                <div className='content'>
                    <ProgressBar/>
            esw
                    <Question
                        currentQuestion={currentQuestion}
                        selectElementType={this.selectElementType}
                    />
                </div>

                <div className='navigation'>
                </div>
            </div>
        )
    }
}

CreateAlarm.propTypes = {
    handleAddAlarm: PropTypes.func.isRequired,

}
