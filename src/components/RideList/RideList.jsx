import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';

function NewRideList(props) {

  const rides = useSelector((store) => store.rides);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const options = { hour: "2-digit", minute: "2-digit" };
  const history = useHistory();

  useEffect(() => {
    //dispatch({type:'FETCH_USER_RIDES', payload: user.id}) : dispatch({type: 'FETCH_ALL_RIDES' })
    dispatch({ type: 'FETCH_ALL_RIDES' });
  }, []);

  const handleOnClick = (ride) => {
    dispatch({ type: 'FETCH_RIDE_DETAILS', payload: ride })
    history.push('/ride-details')
  }

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <Typography variant="h4" sx={{ mb: 5, mt: 3 }}>
          {props.filterByUser ? 'My Rides' : 'All Rides'
          }
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
                <Card sx={{ width: 325 }} elevation={5}>
                  <CardActionArea
                    onClick={() => { handleOnClick(ride) }}
                  >
                    <CardContent>
                      <Grid
                        container
                        direction="row"
                        justifyContent="left"
                        alignItems="center"
                        spacing={1}>

                        <Grid item xs={6} sx={{ padding: 1 }}>
                          <Typography sx={{ fontSize: '22px', fontWeight: 600 }} >
                            {new Date(ride.event_timestamp).toLocaleDateString()}
                          </Typography>
                          <Typography sx={{ fontSize: '20px', fontWeight: 500 }} >
                            {new Date(ride.event_timestamp).toLocaleTimeString(`en-US`, options)}
                          </Typography>
                          <Typography sx={{ fontSize: '18px', fontWeight: 500 }} >
                            {ride.event_type}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Grid
                            container
                            direction="column"
                            justifyContent="left"
                            alignItems="left"
                            sx={{ pt: 1 }}
                          >
                            <Grid item xs={12} sx={{ mt: 1 }}>
                              <Grid
                                container
                                direction="column"
                                justifyContent="left"
                                alignItems="left"
                              >
                                <Grid item xs={12}
                                  sx={{ display: 'flex', alignItems: 'right', justifyContent: 'right' }}
                                >
                                  <Typography sx={{ fontSize: '20px', color: 'success.main' }} >{ride.ride_status}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
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
