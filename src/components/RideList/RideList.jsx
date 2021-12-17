import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Container, Grid, Card, CardContent, Rating, Typography, Button, Box } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardAction from '@mui/material/CardAction';
import Divider from '@mui/material/Divider'

function RideList(props) {
  const [heading, setHeading] = useState('Functional Component');

  const rides = useSelector((store) => store.rides);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  
  const options = {hour: "2-digit", minute: "2-digit"};
  // const rideDate = new Date(task.dateCompleted ).toLocaleDateString() + ' ' +
  //                     new Date(task.dateCompleted ).toLocaleTimeString( `en-US`, options );

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
      
      <Box>
        <Container>        
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}>  

               {rides.map(ride=>{
                return (
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            <Card elevation={3} sx={{width: '75%', p: 1, my: 0.5 }}>
                              <Grid container direction="row" sx={{border:1}}>
                                {/* <Grid item sx={6} sx={{border:1}}> */}
                                  <CardHeader sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border:1 }} 
                                          title={new Date(ride.pickup_timestamp).toLocaleDateString()}
                                          subheader={new Date(ride.pickup_timestamp).toLocaleTimeString( `en-US`, options )}
                                          titleTypographyProps={{
                                            variant: "h4",
                                            align: "left"
                                            }}
                                            subheaderTypographyProps={{
                                              variant: "h6",
                                              align: "left",
                                              color: "secondary",
                                              gutterBottom: true
                                            }}>
                                  </CardHeader>
                                {/* </Grid> */}
                                  {/* <Grid item sx={2} sx={{border:1}}> */}
                                    <CardContent sx={{border:1}}>
                                        This is something
                                    </CardContent>
                                    <CardAction>
                                      This is the action
                                    </CardAction>
                                {/* </Grid> */}
                              </Grid>
                            </Card>
                          </Box>  
                        </Grid>                    
                )
              })} 
            </Grid>            
        </Container>  
      </Box>

    </div>
  );
}

export default RideList;
