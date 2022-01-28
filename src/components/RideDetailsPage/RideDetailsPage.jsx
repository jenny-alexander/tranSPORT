import React, { useEffect } from 'react';
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
  const dispatch = useDispatch();
  const history = useHistory();
  let myStorage = window.sessionStorage;
  let lastPageVisited;

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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <Grid item>
          <Button variant="contained" sx={{ fontWeight: 'bold', width: '40ch', mt: 1 }}
            onClick={() => { history.push(lastPageVisited) }}>Back To List
          </Button>
        </Grid>
      </Box>
    </div >
  );
}

export default RideDetailsPage;
