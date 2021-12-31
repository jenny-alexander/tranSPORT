import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import RideDetailsForm from '../RideDetailsForm/RideDetailsForm';

function RideDetailsPage(props) {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignUp = () => {
    console.log(`in handleSignUp!`);
  }

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3, mt: 3 }}>
        <Grid item xs={12} >
          <Typography gutterBottom component="div"
            sx={{ fontSize: 28 }}>
            Ride Details
          </Typography>
        </Grid>
      </Grid>

      <Container>
        <RideDetailsForm />

        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <Grid item>
            <Button variant="outlined" sx={{ width: '32ch', m: 1 }}
              onClick={() => { history.push('/view/allrides') }}>Back to Ride List</Button>
          </Grid>
        </Box> */}
      </Container>
    </div >
  );
}

export default RideDetailsPage;
