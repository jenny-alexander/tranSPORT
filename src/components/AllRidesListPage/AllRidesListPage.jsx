import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import RideList from '../RideList/RideList';

function AllRidesListPage(props) {

  const rides = useSelector((store) => store.rides);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const options = { hour: "2-digit", minute: "2-digit" };
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_RIDES' });
  }, []);

  // const handleOnClick = (ride) => {
  //   dispatch({ type: 'FETCH_RIDE_DETAILS', payload: ride })
  //   history.push('/ride-details')
  // }

  return (
    <div>
      <h3>{JSON.stringify(rides)}</h3>
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
          <RideList ride={ride} />
        })}
        {/*}
          return (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <Card sx={{ width: 325, borderRadius: 5 }} elevation={5}>
                  <CardActionArea
                    onClick={() => { handleOnClick(ride) }}
                  >
                    <CardContent>
                      <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item xs={9}>
                          <Typography sx={{ fontSize: '22px', fontWeight: 600 }} >
                            {new Date(ride.event_timestamp).toLocaleDateString()}
                          </Typography>
                          <Typography sx={{ fontSize: '20px', fontWeight: 500 }} >
                            {new Date(ride.event_timestamp).toLocaleTimeString(`en-US`, options)}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <SportsHockeyIcon sx={{ mr: 1 }} />
                            <Typography sx={{ fontSize: '18px', fontWeight: 500 }} >
                              {ride.event_type}
                            </Typography>

                          </Box>
                          <Typography sx={{ mt: 3, fontSize: '14px', fontWeight: 500 }} >
                            {ride.player_name}
                          </Typography>
                        </Grid>
                        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }}>
                          {ride.ride_status === 'Needs Driver!' ?
                            <HailIcon sx={{ fontSize: 50 }} /> :
                            <CheckCircleOutlineIcon sx={{ fontSize: 40, color: 'success.main' }} />
                          }
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            </Grid>
          )
        })}*/}
      </Grid>
    </div >
  );
}

export default AllRidesListPage;
