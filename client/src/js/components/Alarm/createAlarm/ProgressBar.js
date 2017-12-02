import React from 'react'
import PropTypes from 'prop-types'

function ProgressBar({allQuestions, allAnswers, progress}) {
    return (
        <div className="progress-container">
            <div className="progress">
                <div className="progress-bar" style={{'width': `${allAnswers.length / allQuestions.length * 100}%`}}>
                    <span className="sr-only">{`${allAnswers.length / allQuestions.length * 100} Complete`}</span>
                </div>
            </div>
            <div className="progress-label">{`${allAnswers.length} of ${allQuestions.length} answered`}</div>
        </div>
    )
}

ProgressBar.PropTypes = {
    allQuestions: PropTypes.array.isRequired,
    allAnswers: PropTypes.array.isRequired,
    progress: PropTypes.number.isRequired,
}

export default ProgressBar
