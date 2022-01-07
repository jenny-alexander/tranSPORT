import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RideDetailsPaper from '../RideDetailsPaper/RideDetailsPaper';

function RideDetailsPage(props) {
  const user = useSelector(store => store.user);
  const rides = useSelector(store => store.rides);
  let ride;
  const dispatch = useDispatch();
  const history = useHistory();
  let myStorage = window.sessionStorage;
  let lastPageVisited;

  // const handleSignUp = () => {
  //   console.log(`in handleSignUp!`);
  // }
  useEffect(() => {
    lastPageVisited = myStorage.getItem('last_page_visited');
  }, []);

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center">
        <Grid item xs={12} >
          <Typography gutterBottom component="div"
            sx={{ fontSize: 32, mt: 3 }}>
            Ride Details
          </Typography>
        </Grid>
      </Grid>
      <Container>
        <RideDetailsPaper />
      </Container>
      <Grid item xs={12}>
        <Box sx={{
          display: "flex",
          justifyContent: "left",
          position: "absolute",
          bottom: "0",
          left: "4%"
        }}>
          <Button variant="outlined" sx={{ width: '20ch', m: 1 }}
            // onClick={() => { history.push('/view/allrides') }}>
            // onClick={() => { history.goBack() }}>
            onClick={() => { history.push(lastPageVisited) }}>

            Back
          </Button>
        </Box>
      </Grid>
    </div >
  );
}

export default RideDetailsPage;
