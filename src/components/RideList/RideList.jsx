import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Grid, Typography, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import FaceIcon from '@mui/icons-material/Face';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

function RideList(props) {
  const rides = useSelector((store) => store.rides);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  
  const options = {hour: "2-digit", minute: "2-digit"};

  useEffect(()=>{
    console.log(`in useEffect of RideList`)
    console.log( `userid is:`, user.id)
    console.log( `props for filtering is:`, props.filterByUser );
    props.filterByUser ? 
      dispatch({type:'FETCH_USER_RIDES', payload: user.id}) : dispatch({type: 'FETCH_ALL_RIDES' })
    }, []);

  return (
    
    <div>
      <div className='title'>
      {
        props.filterByUser ? <h2>My Rides</h2> : <h2>All Rides</h2>
      }
      </div>
      <h3>{JSON.stringify(rides)}</h3>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >  

                { rides.map(ride=>{
                return (
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            <Card sx={{ minWidth: 325 }}>
                              <CardContent>
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="left"
                                  alignItems="center"
                                  spacing={1}> 

                                  <Grid item xs={3} sx={{padding:1}}>
                                    <Typography sx={{fontSize: '16px'}} >                                    
                                      {new Date(ride.pickup_timestamp).toLocaleDateString()}
                                    </Typography>
                                    <Typography sx={{fontSize: '13px'}} >
                                    {new Date(ride.pickup_timestamp).toLocaleTimeString( `en-US`, options )}
                                    </Typography>                                
                                  </Grid>
                                  <Grid item xs={9}>
                                    <Grid
                                      container
                                      direction="column"
                                      justifyContent="left"
                                      alignItems="left"
                                    > 
                                    <Grid item xs={12} sx={{mt:1}}>
                                      <Grid
                                        container
                                        direction="row"
                                        justifyContent="left"
                                        alignItems="left"                                    
                                      >                   
                                        <Grid item xs={2} 
                                              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                          <FaceIcon fontSize='small'/>
                                        </Grid>
                                        <Grid item xs={10}
                                              sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }}
                                        >
                                          <Typography sx={{fontSize: '12px'}} >{ride.child_name}</Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  
                                    <Grid item xs={12} >
                                      <Grid
                                        container
                                        direction="row"
                                        justifyContent="left"
                                        alignItems="left"                                    
                                      >                   
                                      <Grid item xs={2}
                                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <LocationOnIcon fontSize='small' />
                                      </Grid>
                                      <Grid item xs={10}
                                            sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', pt:1 }}
                                      >
                                        <Typography sx={{fontSize: '12px'}} >{ride.pickup_location}</Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>                                  
                                </Grid>                  
                              </Grid>
                            </Grid>
                            </CardContent>
                          <CardActions>
                            <Button size="small">Learn More</Button>
                          </CardActions>
                        </Card>
                      </Box>  
                    </Grid>                    
                )
              })}  
            </Grid>            
    </div>
  );
}

export default RideList;
