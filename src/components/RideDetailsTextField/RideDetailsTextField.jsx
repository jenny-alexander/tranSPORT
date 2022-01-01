import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

function RideDetailsTextField(props) {

  return (
    <Grid item xs={12}>
      <TextField
        disabled
        label={props.label}
        sx={{ mb: 1, width: '30ch' }}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={props.value}
      />
    </Grid>
  )
}

export default RideDetailsTextField;
