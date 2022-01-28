import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CreateRideForm from '../CreateRideForm/CreateRideForm';

function CreateRidePage(props) {
  const dispatch = useDispatch();
  const history = useHistory();

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
            Create New Ride Request
          </Typography>
        </Grid>
      </Grid>
      <Container>
        <CreateRideForm />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <Grid item>
            <Button variant="outlined" sx={{ width: '35ch', mt: 1 }}
              // onClick={() => { history.push('/login') }}>Back</Button>
              onClick={() => { history.push('/home') }}>Cancel
            </Button>
          </Grid>
        </Box>
      </Container>
    </div >
  );
}

export default CreateRidePage;
