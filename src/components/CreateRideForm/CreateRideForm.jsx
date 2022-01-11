import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material';
import { Container, Grid } from '@mui/material';
import Switch from '@mui/material/Switch';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ConfirmRideTextField from '../ConfirmRideTextField/ConfirmRideTextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';

function CreateRideForm(props) {
  const [open, setOpen] = useState(false); //this is for the modal confirmation 
  const [snackbarState, setSnackbarState] = useState(false);
  const [player, setPlayer] = useState('')
  const [returnTripText, setReturnTripText] = useState('');
  const [gameText, setGameText] = useState('');
  const [newRideID, setNewRideID] = useState(0);
  const [newRide, setNewRide] = useState({
    pickupDate: '',
    pickupTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    game: false,
    returnTrip: false
  });
  const [newComment, setNewComment] = useState('');
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  let myStorage = window.sessionStorage;
  const modalTextfieldValues = [
    { label: 'Player Name', defaultValue: player },
    { label: 'Event Date', defaultValue: newRide.pickupDate },
    { label: 'Event Time', defaultValue: newRide.pickupTime },
    { label: 'Pickup Location', defaultValue: newRide.pickupLocation },
    { label: 'Dropoff Location', defaultValue: newRide.dropoffLocation },
    { label: 'Game', defaultValue: gameText },
    { label: 'Return Trip', defaultValue: returnTripText }
  ]

  useEffect(() => {
    setPlayer(user.player_name);
  }, []);

  const determineReturnTripText = () => {
    //Make boolean values more user-friendly.
    newRide.returnTrip ? setReturnTripText('Yes') : setReturnTripText('No');
    newRide.game ? setGameText('Yes') : setGameText('No');
  }

  const createRide = () => {
    determineReturnTripText();
    //This displays the confirmation modal to the user
    setOpen(true);
  }
  const handleCancel = () => {
    setOpen(false);
  }
  const handleConfirmCreate = (event) => {
    const concatDateTime = newRide.pickupDate + " " + newRide.pickupTime;
    const rideTimestamp = new Date(concatDateTime).toISOString();

    event.preventDefault();

    dispatch({
      type: 'CREATE_RIDE',
      payload: {
        ride: newRide,
        player: user.player_name,
        creatorId: user.id,
        eventTimestamp: rideTimestamp,
        comment: newComment,
        createdTimestamp: new Date()
      },
    });

    setOpen(false);

    setSnackbarState(true);

    delayedNavigation();
  }

  const handleGameChange = (event) => {
    setNewRide({ ...newRide, game: event.target.checked });
  }

  const handleReturnTripChange = (event) => {
    setNewRide({ ...newRide, returnTrip: event.target.checked });
  }

  const handleCloseSnackbar = () => {
    setSnackbarState(false);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function delayedNavigation() {
    await sleep(2000);
    history.push('/view/myrides') //bring user back to list
    //let rideID = myStorage.getItem('ride_id')
    //history.push(`/ride-details/${rideID}`)
  }

  const showSnackbar = () => {
    return (
      <div>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleCloseSnackbar}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    )
  }

  return (

    <div>
      <Snackbar
        open={snackbarState}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Ride Successfully Created!"
        action={showSnackbar}
      />
      <Dialog open={open}>
        <DialogTitle>
          Confirm new ride details
        </DialogTitle>
        <DialogContent>
          {modalTextfieldValues.map((modalValues) => (
            <ConfirmRideTextField label={modalValues.label} defaultValue={modalValues.defaultValue} />
          ))}
          <TextField
            disabled
            autoFocus
            margin="dense"
            id="comments"
            multiline
            maxRows={4}
            label="Comments"
            variant="filled"
            type="textarea"
            fullWidth
            defaultValue={newComment}
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
        {/* <Box component="form" onSubmit={createRide}> */}
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
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
            <Box sx={{
              display: 'flex', alignItems: 'left', justifyContent: 'left',
              width: '30ch'
            }} >
              <Switch
                label="Game"
                checked={newRide.game}
                onChange={handleGameChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>Game</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{
              display: 'flex', alignItems: 'left', justifyContent: 'left',
              width: '30ch'
            }} >
              <Switch
                label="Return Trip"
                checked={newRide.returnTrip}
                onChange={handleReturnTripChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>Return Trip</Typography>
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
              onChange={(event) => setNewComment(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              // bottom: "0", 
              right: "2%"
            }}>
              <Button variant="contained" name="createRide"
                sx={{ fontWeight: 'bold', width: '20ch', m: 1 }}
                onClick={createRide}
              >
                Create Ride
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* </Box> */}
      </Container>
    </div >
  );
}

export default CreateRideForm;