import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FaceIcon from '@mui/icons-material/Face';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function Player(props) {
  return (
    <Grid
    container
    direction="row"
    // justifyContent="center"
    // alignItems="center"
    spacing={2}
  > 
      <Grid item sx={2}>
        {/* <FaceIcon fontSize='large' /> */}
        <FaceIcon fontSize='small' />
      </Grid>
      <Grid item sx={9}>
        <TextField 
          disabled
          id="outlined-basic" 
          label="Player Name" 
          variant="outlined" 
          required
          value={props.name}
        />
      </Grid>  
    </Grid>
  );
}

export default Player;
