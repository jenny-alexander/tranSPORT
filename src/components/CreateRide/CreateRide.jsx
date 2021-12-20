import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name CreateRide with the name for the new component.
function CreateRide(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [newRide, setNewRide] = useState( {
      // playerName: 'Michael',
      // pickupDate: new Date().toLocaleDateString(),
      // pickupTime: new Date().toLocaleTimeString(),
      // pickupLocation: '55 Marvin Road, Town, MN, 55555',
      // dropoffLocation: '22 Arrival Ave, Other Town, 33333'
      playerName: '',
      pickupDate: '',
      pickupTime: '',
      pickupLocation: '',
      dropoffLocation: '',
      eventType: '',
      returnTrip: ''
  } );
  const [newComments, setNewComments] = useState ('');

  const history = useHistory();

  const createRide=()=>{
    console.log(`in createRide with ride object:`, newRide);
  }

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{mb:3, mt:3}}>
        <Grid item xs={12} >
          <Typography variant="h5" gutterBottom component="div">
            Create New Ride Request
          </Typography>
        </Grid>            
      </Grid>
      <Container>        
        <Box component="form" onSubmit={createRide}>
           <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >                     
              <Grid item xs={12}>
                <TextField
                  label="Pickup Date"
                  id="pickupDate"
                  sx={{ m: 1, width: '40ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><CalendarTodayIcon /></InputAdornment>,
                  }}
                  variant="standard"
                  required
                  value={newRide.pickupDate}
                  onChange={(event) => setNewRide({...newRide, pickupDate: event.target.value }) }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Pickup Time"
                  id="pickupTime"
                  sx={{ m: 1, width: '40ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><AccessTimeIcon /></InputAdornment>,
                  }}
                  variant="standard"
                  required
                  value={newRide.pickupTime}
                  onChange={(event) => setNewRide({...newRide, pickupTime: event.target.value }) }
                />
              </Grid> 
              <Grid item xs={12}>
                <TextField
                  label="Pickup Location"
                  id="pickupLocation"
                  sx={{ m: 1, width: '40ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
                  }}
                  variant="standard"
                  required
                  value={newRide.pickupLocation}
                  onChange={(event) => setNewRide({...newRide, pickupLocation: event.target.value }) }
                />
              </Grid>              
              <Grid item xs={12}>
                <TextField
                  label="Dropoff Location"
                  id="dropoffLocation"
                  sx={{ m: 1, width: '40ch' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><LocationOnIcon /></InputAdornment>,
                  }}
                  variant="standard"
                  required
                  value={newRide.dropoffLocation}
                  onChange={(event) => setNewRide({...newRide, dropoffLocation: event.target.value }) }
                />
              </Grid>   
              <Grid item sx={12}>
                <FormControl component="fieldset"
                  sx={{ width: '40ch' }}>
                  <FormLabel component="event">Event type</FormLabel>
                  <RadioGroup row aria-label="event" name="row-radio-buttons-group">
                    <FormControlLabel value="practice" control={<Radio />} label="Practice" />
                    <FormControlLabel value="game" control={<Radio />} label="Game" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}> */}
              <Grid item xs={12}>
                <Box sx={{display:'flex', width:'40ch'}}>
                  <FormControlLabel control={<Checkbox />} label="Return Trip" />
                </Box>
              </Grid>
              {/* </Grid> */}
              <Grid item xs={12}>
                <TextField aria-label='empty textarea'
                           defaultValue={newComments}
                           placeholder='Add comments here...'
                          //  style={{ width: 320, fontSize: 17}}
                          sx={{ m: 1, width: '40ch', fontSize: 17 }}
                           align="center"
                           onChange={ ( event ) => setNewComments(event.target.value)}
                           inputProps={{ maxLength: 250 }}/>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{
                    display: "flex", 
                    justifyContent:"center", 
                    position: "absolute", 
                    // bottom: "0", 
                    left: "0%"}}>
                  <Button variant="outlined" sx={{width:'20ch', m:1}}
                          onClick={()=>{history.push('/home')}}>
                      Back
                  </Button>
                </Box>
                <Box sx={{
                    display: "flex", 
                    justifyContent:"center", 
                    position: "absolute", 
                    // bottom: "0", 
                    right: "0%"}}>           
                  <Button variant="contained" sx={{width:'20ch', m:1}}
                          onClick={()=>{history.push('/confirm-ride')}}>
                      Next
                  </Button> 
                </Box>
                </Grid>
          </Grid> 
        </Box>

      </Container>
    </div>
  );
}

export default CreateRide;
