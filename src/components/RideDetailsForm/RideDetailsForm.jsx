import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function RideDetailsPage(props) {
  const [enableComments, setEnableComments] = useState(false);
  const [showUpdateCommentsButton, setShowUpdateCommentsButton] = useState(false)
  const rideDetails = useSelector(store => store.rideDetails);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const options = { hour: "2-digit", minute: "2-digit" };

  useEffect(() => {
    if (user.id === rideDetails.creator_id ||
      user.id === rideDetails.driver) {
      setEnableComments(true);
      setShowUpdateCommentsButton(true);
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

  const handleUpdateComments = () => {
    console.log(` in handleUpdateComments!`);
  }

  return (
    <div>
      <Container>
        <Box component="form" onSubmit={handleSignUp}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={12}>
              <TextField
                disabled
                label="Driver Name"
                id="driverName"
                sx={{ mb: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={rideDetails.driver}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Player Name"
                id="playerName"
                sx={{ mb: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={rideDetails.player_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Event Date"
                id="pickupDate"
                sx={{ mb: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={new Date(rideDetails.event_timestamp).toLocaleDateString()}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Event Time"
                id="pickupTime"
                sx={{ mb: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={new Date(rideDetails.event_timestamp).toLocaleTimeString(`en-US`, options)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Pickup Location"
                id="pickupLocation"
                sx={{ mb: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={rideDetails.pickup_location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Dropoff Location"
                id="dropoffLocation"
                sx={{ mb: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={rideDetails.dropoff_location}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Event Type"
                id="eventType"
                sx={{ mb: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={rideDetails.event_type}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Return Trip"
                id="returnTrip"
                sx={{ mb: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value={
                  rideDetails.return_trip ? 'Yes' : 'No'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled={!enableComments}
                id="comments"
                label="Comments"
                multiline
                rows={4}
                sx={{ mb: 1, width: '30ch', fontSize: 17 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value='TODO: Get comments'
              />
            </Grid>
            <Grid item sx={12}>
              {showUpdateCommentsButton ?
                <Button variant="contained" sx={{ width: '32ch', mb: 1 }}
                  onClick={handleUpdateComments}>Update Comments
                </Button>
                :
                ''
              }
            </Grid>
            <Grid item sx={12}>
              {rideDetails.creator_id === user.id ?
                <Button variant="contained" sx={{ width: '32ch', mb: 1 }}
                  onClick={handleDeleteRide}>Delete
                </Button>
                :
                <Button variant="contained" type="submit" name="submit" fullWidth
                  sx={{ width: '32ch', m: 1 }}>Sign up as Driver!
                </Button>
              }
            </Grid>
            <Grid item sx={12}>
              <Button variant="outlined" sx={{ width: '32ch' }}
                onClick={() => { history.push('/view/allrides') }}>Back to Ride List
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div >
  );
}

export default RideDetailsPage;
