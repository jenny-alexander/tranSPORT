import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import RideDetailsTextField from '../RideDetailsTextField/RideDetailsTextField';

function RideDetailsPage(props) {
  const [enableComments, setEnableComments] = useState(false);
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
      setEnableComments(true);
      setShowUpdateCommentsButton(true);
    }
    //Changing True/False values from DB to Yes/No
    if (rideDetails.return_trip) {
      setReturnTripText('Yes');
    } else {
      setReturnTripText('No');
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
            {textfieldValues.map((textfield) => (
              <RideDetailsTextField label={textfield.label} value={textfield.value} />
            ))}
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
            {/* Buttons */}
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
                  onClick={handleDeleteRide}>Delete Ride
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
