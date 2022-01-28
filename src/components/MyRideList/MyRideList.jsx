import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import RideCardContent from '../RideCardContent/RideCardContent';
import Button from '@mui/material/Button'

function MyRideList(props) {

  const rides = useSelector((store) => store.rides);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_MY_RIDES', payload: user.id });
  }, []);

  const handleOnClick = (ride) => {
    let myStorage = window.sessionStorage;
    myStorage.removeItem('last_page_visited');
    myStorage.setItem('last_page_visited', '/view/myrides');
    history.push(`/ride-details/${ride.id}`)
  }

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <Typography variant="h4" sx={{ mb: 5, mt: 3 }}>
          My Rides
        </Typography>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        {rides.map(ride => {
          return (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <Card sx={{ width: 325, borderRadius: 5 }} elevation={5}>
                  <CardActionArea
                    onClick={() => { handleOnClick(ride) }} >
                    <RideCardContent ride={ride} />
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
          )
        })}
        <Grid item sx={12}>
          <Button variant="contained" fullWidth
            sx={{ fontWeight: 'bold', width: '35ch', height: '5ch', mb: 2 }}
            onClick={() => { history.push('/home') }}>Back to Home Page</Button>
        </Grid>
      </Grid>
    </div >
  );
}

export default MyRideList;
