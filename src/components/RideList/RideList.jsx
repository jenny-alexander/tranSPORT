import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import RideCardContent from '../RideCardContent/RideCardContent';

function NewRideList(props) {
  const rides = useSelector((store) => store.rides);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_RIDES' });
  }, []);

  const handleOnClick = (ride) => {
    history.push(`/ride-details/${ride.id}`)
  }

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <Typography variant="h4" sx={{ mb: 5, mt: 3 }}>
          All Rides
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
                <Card sx={{ width: 325, borderRadius: 3 }} elevation={5}>
                  <CardActionArea onClick={() => { handleOnClick(ride) }}>
                    <RideCardContent ride={ride} />
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </div >
  );
}

export default NewRideList;
