import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Box, TextField, Typography } from '@mui/material';
import { Container, Grid } from '@mui/material';
import { RadioGroup, Radio, Checkbox } from '@mui/material';
import { FormControlLabel, FormControl, FormLabel } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import InputAdornment from '@mui/material/InputAdornment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FaceIcon from '@mui/icons-material/Face';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function CreateRidePage(props) {
  const [open, setOpen] = useState(false); //this is for the modal confirmation 
  const [player, setPlayer] = useState('')
  //const [creatorId, setCreatorId] = useState('');
  // const [time, setTime] = useState('');
  // const [date, setDate] = useState('');
  const [newRide, setNewRide] = useState({
    pickupDate: '',
    pickupTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    eventType: 'Practice',
    returnTrip: false
  });
  const [newComments, setNewComments] = useState('');

  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setPlayer(user.player_name);
    //setCreatorId(user.id);
  }, []);

  const createRide = () => {
    //This displays the confirmation modal to the user
    setOpen(true);
  }
  const handleCancel = () => {
    setOpen(false);
  }
  const handleConfirmCreate = (event) => {
    const concatDateTime = newRide.pickupDate + " " + newRide.pickupTime;
    const rideTimestamp = new Date(concatDateTime).toISOString();
    // console.log(`timestamp is:`, rideTimestamp);
    // console.log(`newRide details are:`, newRide, `and player is:`, player);

    event.preventDefault();
    console.log(`about to call CREATE_RIDE dispatch`);
    dispatch({
      type: 'CREATE_RIDE',
      payload: {
        ride: newRide,
        player: user.player_name,
        creatorId: user.id,
        eventTimestamp: rideTimestamp
      },
    });
  }
  const handleEventChange = (event) => {
    console.log(`in handleEventChange`);
    setNewRide({ ...newRide, eventType: event.target.value })
  }
  const handleReturnTripChange = (event) => {
    console.log(`in handleReturnTripChange`);
    setNewRide({ ...newRide, returnTrip: event.target.checked });
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
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
            width="35ch"
            defaultValue={player}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pickupDate"
            label="Event Date"
            variant="filled"
            type="text"
            width="35ch"
            defaultValue={newRide.pickupDate}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pickupTime"
            label="Event Time"
            variant="filled"
            type="text"
            width="35ch"
            defaultValue={newRide.pickupTime}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pickupLocation"
            label="Pickup Location"
            variant="filled"
            type="text"
            width="35ch"
            defaultValue={newRide.pickupLocation}
          />
          <TextField
            autoFocus
            margin="dense"
            id="dropoffLocation"
            label="Dropoff Location"
            variant="filled"
            type="text"
            width="35ch"
            defaultValue={newRide.dropoffLocation}
          /><TextField
            autoFocus
            margin="dense"
            id="eventType"
            label="Event Type"
            variant="filled"
            type="text"
            width="35ch"
            defaultValue={newRide.eventType}
          />
          <TextField
            autoFocus
            margin="dense"
            id="returnTrip"
            label="Return Trip"
            variant="filled"
            type="text"
            width="35ch"
            defaultValue={
              newRide.returnTrip ? 'Yes' : 'No'
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="comments"
            label="Comments"
            variant="filled"
            type="textarea"
            fullWidth
            defaultValue={newComments}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmCreate} color="primary" autoFocus>
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
                disabled
                label="Player Name"
                id="playerName"
                sx={{ m: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                required
                value={player}
              //onChange={(event) => setNewRide({ ...newRide, playerName: event.target.value })}
              //onChange={(event) => { setPlayer(event.target.value) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Event Date"
                type="date"
                id="pickupDate"
                sx={{ m: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                required
                value={newRide.pickupDate}
                onChange={(event) => setNewRide({ ...newRide, pickupDate: event.target.value })}
              // onChange={(event) => { setDate(event.target.value) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Event Time"
                type="time"
                id="pickupTime"
                sx={{ m: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                required
                value={newRide.pickupTime}
                onChange={(event) => setNewRide({ ...newRide, pickupTime: event.target.value })}
              //onChange={(event) => { setTime(event.target.value) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Pickup Location"
                id="pickupLocation"
                sx={{ m: 1, width: '30ch' }}
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
                sx={{ m: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                required
                value={newRide.dropoffLocation}
                onChange={(event) => setNewRide({ ...newRide, dropoffLocation: event.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset"
                sx={{ width: '30ch' }}>
                <FormLabel component="event">Event type</FormLabel>
                <RadioGroup

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
            <Grid xs={12}>
              <Box sx={{
                display: 'flex', alignItems: 'left', justifyContent: 'left',
                mt: 1, width: '30ch'
              }} >
                <FormGroup>
                  <FormControlLabel control={
                    <Checkbox
                      checked={newRide.returnTrip}
                      onChange={handleReturnTripChange}
                    />}
                    label="Return Trip?"
                    labelPlacement='start' />
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="comments"
                label="Comments"
                multiline
                rows={4}
                sx={{ m: 1, width: '30ch', fontSize: 17 }}
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
