import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Container, Grid, Card, CardContent, Rating, Typography, Button, Box } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';

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
                            
                            <CardContent>
                              <CardHeader title={ride.pickup_date}></CardHeader>
                              {/* { new Date(ride.pickup_date).toLocaleDateString() + ' ' +
                                new Date(ride.pickup_time).toLocaleTimeString( `en-US`, options )} */}
                                { new Date(ride.pickup_date).toLocaleString() }
                              
                            </CardContent>
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
