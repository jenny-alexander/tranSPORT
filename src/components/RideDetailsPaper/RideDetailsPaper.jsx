import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Card, CardContent, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import HailIcon from '@mui/icons-material/Hail';
import DialogContentText from '@mui/material/DialogContentText';
import RideDetailsTextField from '../RideDetailsTextField/RideDetailsTextField';

function RideDetailsPaper(props) {
  const [open, setOpen] = useState(false); //this is for the modal confirmation 
  //const [enableComments, setEnableComments] = useState(false);
  const [showUpdateCommentsButton, setShowUpdateCommentsButton] = useState(false)
  const [returnTripText, setReturnTripText] = useState('');
  const rideDetails = useSelector(store => store.rideDetails);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const options = { hour: "2-digit", minute: "2-digit" };
  const textfieldValues = [
    { label: 'Driver Name', value: rideDetails.driver },
    { label: 'Player Name', value: rideDetails.player_name },
    { label: 'Event Date', value: new Date(rideDetails.event_timestamp).toLocaleDateString() },
    { label: 'Event Time', value: new Date(rideDetails.event_timestamp).toLocaleTimeString(`en-US`, options) },
    { label: 'Pickup Location', value: rideDetails.pickup_location },
    { label: 'Dropoff Location', value: rideDetails.dropoff_location },
    { label: 'Event Type', value: rideDetails.event_type },
    { label: 'Return Trip', value: returnTripText }
  ]

  useEffect(() => {
    if (user.id === rideDetails.creator_id ||
      user.id === rideDetails.driver) {
      //setEnableComments(true);
      setShowUpdateCommentsButton(true);
    }
    //Changing True/False values from DB to Yes/No
    if (rideDetails.return_trip) {
      setReturnTripText('return trip');
    } else {
      setReturnTripText('one way trip');
    }

  }, []);

  const handleSignUp = () => {
    console.log(`in handleSignUp!`);
    dispatch({
      type: 'UPDATE_RIDE_WITH_DRIVER',
      payload: {
        userID: user.id,
        rideID: rideDetails.id
      },
    })
  }

  const handleDeleteRide = () => {
    console.log(`in handleDeleteRide`);
    dispatch({
      type: 'DELETE_RIDE_REQUEST',
      payload: rideDetails.id
    })
  }

  const handleAddComments = () => {
    console.log(` in handleAddComments!`);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Comments</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="comments"
            label="Comments"
            type="textarea"
            multiline
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog> */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3, mt: 3 }}>
        <Box
          sx={{
            display: 'flex',
            '& > :not(style)': {
              m: 1,
              width: 320
            },
          }}
        >
          <Card
            elevation={1}
            sx={{ m: 1 }} >
            <CardContent >
              <Box sx={{ my: 2 }}>
                <Typography variant="h6">
                  {rideDetails.driver ? `Driver is ${rideDetails.driver}` : 'Driver needed!'}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ mt: 2 }}>
                <Typography >
                  Pickup {rideDetails.player_name} on {new Date(rideDetails.event_timestamp).toLocaleDateString()} for
                  {rideDetails.event_type} at {new Date(rideDetails.event_timestamp).toLocaleTimeString(`en-US`, options)}.
                </Typography>
              </Box>
              <Box sx={{ mt: 1, mb: 1 }}>
                <Typography>
                  Pickup Location is {rideDetails.pickup_location} and dropoff is {rideDetails.dropoff_location}.
                </Typography>
              </Box>
              <Typography>
                This is a {returnTripText}.
              </Typography>
            </CardContent>
            <CardActions>
              {showUpdateCommentsButton ?
                <Button size="small" sx={{ mr: 5, ml: 1 }}
                  onClick={handleAddComments}>Add Comments
                </Button>
                :
                ''
              }
              {rideDetails.creator_id === user.id ?
                <Button size="small" sx={{ ml: 10 }}>Delete Ride</Button>
                :
                <Button size="small" >Sign Up to Drive</Button>
              }
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </div >
  );
}

export default RideDetailsPaper;
