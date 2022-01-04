import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

function ConfirmeRideTextField(props) {

  return (
    <TextField
      disabled
      autoFocus
      margin="dense"
      label={props.label}
      variant="filled"
      type="text"
      fullWidth
      defaultValue={props.defaultValue}
    />
  )
}

export default ConfirmeRideTextField;
