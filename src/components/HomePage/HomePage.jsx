import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Container, Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

function HomePage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`help`)
    //dispatch({ type: 'FETCH_PROFILE', payload: user.id });
    console.log(`done dispatch...?`)
  }, []);

  const user = useSelector((store) => store.user);
  const profile = useSelector((store) => store.profile);

  return (
    <div>
      <h3>{JSON.stringify(profile)}</h3>
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
    </div>
  );
}

export default HomePage;
