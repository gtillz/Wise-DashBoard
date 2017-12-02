import React from 'react'
import PropTypes from 'prop-types'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange300, white} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

const muiTheme = getMuiTheme({
    palette: {
      textColor: white,
      primary1Color: deepOrange300
    },
  });

  const style = {
    marginTop: 8,
  };
  

function SetButton({onSubmit, isDisabled}) {
    return (
        <div>
            <MuiThemeProvider muiTheme={muiTheme}>
                <RaisedButton label="Set Alarm" style={style} primary={true} onClick={()=> onSubmit()} disabled={isDisabled}/>
            </MuiThemeProvider>
        </div>
    )
}

SetButton.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
}

export default SetButton
