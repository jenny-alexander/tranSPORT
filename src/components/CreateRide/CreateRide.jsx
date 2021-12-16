import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name CreateRide with the name for the new component.
function CreateRide(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [newRide, setNewRide] = useState( {
      playerName: 'Michel',
      pickupDate: new Date().toLocaleDateString(),
      pickupTime: new Date().toLocaleTimeString(),
      pickupLocation: '55 Marvin Road, Town, MN, 55555',
      dropoffLocation: '22 Arrival Ave, Other Town, 33333'
  } );
  const [newComments, setNewComments] = useState ('');

  const history = useHistory();

  const createRide=()=>{
    console.log(`in createRide with ride object:`, newRide);
  }

  return (
    <div>
      <h2>Create a New Ride</h2>
      <Container>
        <Box component="form" onSubmit={createRide}>

           <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          > 

              <Grid item sx={12}>
                <TextField 
                  disabled
                  id="outlined-basic" 
                  label="Player Name" 
                  variant="outlined" 
                  required
                  value={newRide.playerName}
                />
              </Grid>  

              <Grid item sx={12}>
                <TextField 
                  id="outlined-basic" 
                  label="Pickup Date" 
                  variant="outlined" 
                  required
                  value={newRide.pickupDate}
                  onChange={(event) => setNewRide({...newRide, pickupDate: event.target.value }) }
                />
              </Grid>

              <Grid item sx={12}>
                <TextField 
                  id="outlined-basic" 
                  label="Pickup Time" 
                  variant="outlined" 
                  required
                  value={newRide.pickupTime}
                  onChange={(event) => setNewRide({...newRide, pickupTime: event.target.value }) }
                />
              </Grid>
 
              <Grid item sx={12}>
                <TextField 
                  id="outlined-basic" 
                  label="Pickup Location" 
                  variant="outlined" 
                  required
                  value={newRide.pickupLocation}
                  onChange={(event) => setNewRide({...newRide, pickupLocation: event.target.value }) }
                />
              </Grid>

              <Grid item sx={12}>
                <TextField 
                  id="outlined-basic" 
                  label="Dropoff Location" 
                  variant="outlined" 
                  required
                  value={newRide.dropoffLocation}
                  onChange={(event) => setNewRide({...newRide, dropoffLocation: event.target.value }) }
                />                
              </Grid> 

              {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}
              <Grid item sx={12}>
                <TextField aria-label='empty textarea'
                           defaultValue={newComments}
                           placeholder='Add comments here...'
                           style={{ width: 300, fontSize: 17}}
                           align="center"
                           onChange={ ( event ) => setNewComments(event.target.value)}
                           inputProps={{ maxLength: 250 }}/>
              {/* </Box> */}
              </Grid>

              <Grid item sx={12}>
                <Button variant="contained" onClick={()=>{history.push('/home')}}>Back</Button>
                <Button variant="contained" type="submit" name="submit" onClick={()=>{history.push('/confirm-ride')}}>Next</Button>
              </Grid>

          </Grid> 
        </Box>

      </Container>
    </div>
  );
}

export default CreateRide;
