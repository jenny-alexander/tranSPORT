import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Button, Container, Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import ModalDialogue from '../ModalDialogue/ModalDialogue';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name HomePage with the name for the new component.
function HomePage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const history = useHistory();

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <img src='images/logo.png' alt='logo'></img>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <Typography variant="h5" sx={{ mb: 5 }}>
          What would you like to do?
        </Typography>
      </Box>
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}>
          <Grid item sx={12}>
            <Button variant="contained"
              sx={{ width: '40ch' }}
              onClick={() => { history.push('/create') }}>Create Ride Request</Button>
          </Grid>
          <Grid item sx={12}>
            <Button
              variant="contained"
              sx={{ width: '40ch' }}
              onClick={() => { history.push('/view/myrides') }}>View My Rides
            </Button>
          </Grid>
          <Grid item sx={12}>
            <Button variant="outlined"
              sx={{ width: '40ch' }}
              onClick={() => { history.push('/view/allrides') }}>View All Rides
            </Button>
          </Grid>
        </Grid>

      </Container>
      <ModalDialogue show='true' />
    </div>
  );
}

export default HomePage;
