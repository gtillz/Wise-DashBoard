import React from 'react'
import PropTypes from 'prop-types'

function Question({currentQuestion, selectElementType}) {
    const {question, elementType} = currentQuestion;
    return (
        <div className={`question`}>
            {/* <div className={`question fade-out ${loadNextQuestion ? 'fade-out-active' : ''}`}> */}
            <h3>{question}</h3>
                {
                    selectElementType(elementType)
                }
        </div>
    )
}

Question.propTypes = {
    currentQuestion: PropTypes.object.isRequired,
    selectElementType: PropTypes.func.isRequired,
}

export default Question
