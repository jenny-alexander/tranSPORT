import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import HomeIcon from '@mui/icons-material/Home';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/system';

function NewRideList(props) {
  
  const rides = useSelector((store) => store.rides);
  const dispatch = useDispatch();
  const options = {hour: "2-digit", minute: "2-digit"};

  useEffect(()=>{
      //dispatch({type:'FETCH_USER_RIDES', payload: user.id}) : dispatch({type: 'FETCH_ALL_RIDES' })
      dispatch({type: 'FETCH_ALL_RIDES' });
    }, []);
    
    const handleOnClick=()=>{
      console.log('in handleOnClick');
    }
    
  return (
    <div>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
        <Typography variant="h4" sx={{mb:5}}>
        {props.filterByUser ? 'My Rides' : 'All Rides'     
          }
      </Typography>   
      </Box>
      {/* <h3>{JSON.stringify(rides)}</h3> */}
      
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
                            <Card sx={{ width:325 }} elevation={5}>
                            <CardActionArea onClick={handleOnClick}>
                              <CardContent>
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="left"
                                  alignItems="center"
                                  spacing={1}> 

                                  <Grid item xs={5} sx={{padding:1}}>
                                    <Typography sx={{fontSize: '22px', fontWeight:600}} >                                    
                                      {new Date(ride.pickup_timestamp).toLocaleDateString()}
                                    </Typography>
                                    <Typography sx={{fontSize: '15px', fontWeight:500}} >
                                    {new Date(ride.pickup_timestamp).toLocaleTimeString( `en-US`, options )}
                                    </Typography>    
                                    <Typography sx={{fontSize: '15px', fontWeight:500, color: 'success.main'}} >
                                      {ride.ride_status}
                                    </Typography>                                                                  
                                  </Grid>
                                  <Grid item xs={7}>
                                    <Grid
                                      container
                                      direction="column"
                                      justifyContent="left"
                                      alignItems="left"
                                      sx={{pt:1}}
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
                                          <FaceIcon fontSize='medium'/>
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
                                        <HomeIcon fontSize='medium' />
                                      </Grid>
                                      <Grid item xs={10}
                                            sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left', pt:1 }}>
                                        <Typography sx={{fontSize: '12px'}} >{ride.pickup_location}</Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>                                  
                                </Grid>                  
                              </Grid>
                            </Grid>
                            </CardContent>
                            </CardActionArea>
                            {/* <CardActions>
                              <Button variant="contained" 
                                                    size="large"
                                                    sx={{ height: 60, width: 90, m:3}}
                                                    onClick={handleOnClick}>Submit</Button>  
                            </CardActions> */}
                        </Card>
                      </Box>  
                    </Grid>                  
                )
              })}  
            </Grid>    
      
    </div>
  );
  
}

export default NewRideList;
