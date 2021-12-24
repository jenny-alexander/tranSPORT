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
import FaceIcon from '@mui/icons-material/Face';
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
    playerName: 'Ben Cook', //TODO put user's player in here
    pickupDate: '',
    pickupTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    eventType: 'Practice',
    tripType: 'Return Trip'
  });
  const [newComments, setNewComments] = useState('');

  //TODO: get player name from user
  const user = useSelector(store => store.user);
  const date = new Date();
  let today = date.toISOString().substring(0, 10);

  const dispatch = useDispatch();
  const history = useHistory();

  const createRide = () => {
    console.log(`in createRide with ride object:`, newRide);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleEventChange = (event) => {
    console.log(`in handleEventChange`);
    setNewRide({ ...newRide, eventType: event.target.value })
  }
  const handleTripTypeChange = (event) => {
    console.log(`in handleTripTypeChange`);
    setNewRide({ ...newRide, tripType: event.target.value });
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
            id="playerName"
            label="Player Name"
            variant="filled"
            type="text"
            fullWidth
            defaultValue={newRide.playerName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pickupDate"
            label="Event Date"
            variant="filled"
            type="text"
            fullWidth
            defaultValue={newRide.pickupDate}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pickupTime"
            label="Event Time"
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
            id="tripType"
            label="Trip Type"
            variant="filled"
            type="text"
            fullWidth
            defaultValue={newRide.tripType}
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
                label="Player Name"
                id="playerName"
                sx={{ m: 1, width: '40ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                required
                value={newRide.playerName}
                onChange={(event) => setNewRide({ ...newRide, playerName: event.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Event Date"
                type="date"
                id="pickupDate"
                sx={{ m: 1, width: '40ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                required
                value={newRide.pickupDate}
                onChange={(event) => setNewRide({ ...newRide, pickupDate: event.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Event Time"
                type="time"
                id="pickupTime"
                sx={{ m: 1, width: '40ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
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
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
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
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                required
                value={newRide.dropoffLocation}
                onChange={(event) => setNewRide({ ...newRide, dropoffLocation: event.target.value })}
              />
            </Grid>
            <Grid item sx={12}>
              <FormControl component="fieldset"
                sx={{ width: '40ch' }}>
                <FormLabel component="event">Event type</FormLabel>
                <RadioGroup
                  row
                  aria-label="event"
                  name="row-radio-buttons-group"
                  defaultValue="Practice"
                  onChange={handleEventChange}>
                  <FormControlLabel value="Practice" control={<Radio />} label="Practice" />
                  <FormControlLabel value="Game" control={<Radio />} label="Game" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}> */}
            <Grid item xs={12}>
              <FormControl component="fieldset"
                sx={{ width: '40ch' }}>
                <FormLabel component="event">Trip type</FormLabel>
                <RadioGroup
                  row
                  aria-label="trip-type"
                  name="row-radio-buttons-group"
                  defaultValue="Return Trip"
                  onChange={handleTripTypeChange}>
                  <FormControlLabel value="Return Trip" control={<Radio />} label="Return Trip" />
                  <FormControlLabel value="One Way" control={<Radio />} label="One Way" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* </Grid> */}
            <Grid item xs={12}>
              <TextField
                id="comments"
                label="Comments"
                multiline
                rows={4}
                sx={{ m: 1, width: '40ch', fontSize: 17 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => setNewComments(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                // bottom: "0", 
                right: "0%"
              }}>
                <Button variant="contained" type="submit" name="submit"
                  sx={{ width: '20ch', m: 1 }}
                >
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
