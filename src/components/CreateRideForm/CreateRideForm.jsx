import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Box, TextField, Typography } from '@mui/material';
import { Container, Grid } from '@mui/material';
import { RadioGroup, Radio, Checkbox } from '@mui/material';
import { FormControlLabel, FormControl, FormLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function CreateRidePage(props) {
  const store = useSelector((store) => store);
  const [open, setOpen] = useState(false);
  const [newRide, setNewRide] = useState({
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
  });
  const [newComments, setNewComments] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const createRide = () => {
    console.log(`in createRide with ride object:`, newRide);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      {/* Define modal reqs here - to be opened when user clicks on the 
      create button. */}
      <Dialog open={open}>
        <DialogTitle>
          {/* {props.title} */}
          Confirm new ride details
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="pickupDate"
            label="Pickup Date"
            variant="filled"
            type="text"
            fullWidth
            defaultValue={newRide.pickupDate}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pickupTime"
            label="Pickup Time"
            variant="filled"
            type="text"
            fullWidth
            defaultValue={newRide.pickupTime}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pickupLocation"
            label="Pickup Location"
            variant="filled"
            type="text"
            fullWidth
            defaultValue={newRide.pickupLocation}
          />
          <TextField
            autoFocus
            margin="dense"
            id="dropoffLocation"
            label="Dropoff Location"
            variant="filled"
            type="text"
            fullWidth
            defaultValue={newRide.dropoffLocation}
          /><TextField
            autoFocus
            margin="dense"
            id="eventType"
            label="Event Type"
            variant="filled"
            type="text"
            fullWidth
            defaultValue={newRide.eventType}
          />
          <TextField
            autoFocus
            margin="dense"
            id="returnTrip"
            label="Return Trip"
            variant="filled"
            type="text"
            fullWidth
            defaultValue={newRide.returnTrip}
          />
          <TextField
            autoFocus
            margin="dense"
            id="comments"
            label="Comments"
            variant="filled"
            type="text"
            fullWidth
            defaultValue={newComments}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Container>
        <Box component="form" onSubmit={createRide}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            {/* Textfields containing user input */}
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
                onChange={(event) => setNewRide({ ...newRide, pickupDate: event.target.value })}
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
                onChange={(event) => setNewRide({ ...newRide, pickupTime: event.target.value })}
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
                onChange={(event) => setNewRide({ ...newRide, pickupLocation: event.target.value })}
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
                onChange={(event) => setNewRide({ ...newRide, dropoffLocation: event.target.value })}
              />
            </Grid>
            <Grid item sx={12}>
              <FormControl component="fieldset"
                sx={{ width: '40ch' }}>
                <FormLabel component="event">Event type</FormLabel>
                <RadioGroup row aria-label="event" name="row-radio-buttons-group" defaultValue="practice">
                  <FormControlLabel value="practice" control={<Radio />} label="Practice" />
                  <FormControlLabel value="game" control={<Radio />} label="Game" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}> */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', width: '40ch' }}>
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
                onChange={(event) => setNewComments(event.target.value)}
                inputProps={{ maxLength: 250 }} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                // bottom: "0", 
                right: "0%"
              }}>
                <Button variant="contained" sx={{ width: '20ch', m: 1 }}
                  onClick={createRide}>
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </div >
  );
}

export default CreateRidePage;
