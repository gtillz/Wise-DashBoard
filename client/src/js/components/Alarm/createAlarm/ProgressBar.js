import React from 'react'
// import PropTypes from 'prop-types'

function ProgressBar(props) {
    return (
        <div className="progress-container">
            <div className="progress">
                <div className="progress-bar" style={{'width': `20%`}}>
                    <span className="sr-only">{`20% Complete`}</span>
                </div>
            </div>
            <div className="progress-label">{`1 of 5 answered`}</div>
        </div>
    )
}

// ProgressBar.PropTypes = {

// }

export default ProgressBar
