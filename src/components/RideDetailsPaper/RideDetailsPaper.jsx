import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, DialogContentText
} from '@mui/material';
import { Card, CardContent, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function RideDetailsPaper(props) {
  const [openComments, setOpenComments] = useState(false); //this is for the modal confirmation 
  const [openConfirmDialogue, setOpenConfirmDialogue] = useState(false);
  const [signupSnackbarState, setSignupSnackbarState] = useState(false);
  const [showUpdateCommentsButton, setShowUpdateCommentsButton] = useState(false)
  const [returnTripText, setReturnTripText] = useState('');
  const [gameText, setGameText] = useState('');
  const [newComment, setNewComment] = useState('');
  const rideComments = useSelector(store => store.comment)
  const rideDetails = useSelector(store => store.rideDetails);
  const params = useParams();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const options = { hour: "2-digit", minute: "2-digit" };

  useEffect(() => {
    dispatch({
      type: 'FETCH_RIDE_BY_ID',
      payload: params.id
    })
    if (user.id == rideDetails.creator_id ||
      user.id == rideDetails.driver_id) {
      setShowUpdateCommentsButton(true);
    }
    //Changing True/False values from DB to Yes/No
    rideDetails.return_trip ? setReturnTripText('return trip') : setReturnTripText('one way trip');
    rideDetails.game ? setGameText(' game') : setGameText(' practice');
    dispatch({ type: 'FETCH_RIDE_COMMENTS', payload: params.id });
  }, [params.id]);

  const handleSignUp = () => {
    //Show modal dialogue to confirm sign up.
    setOpenConfirmDialogue(true);
  }

  const dispatchDriverSignUp = () => {
    dispatch({
      type: 'UPDATE_RIDE_WITH_DRIVER',
      payload: {
        userID: user.id,
        rideID: rideDetails.id
      },
    })
    //close the modal dialogue
    setOpenConfirmDialogue(false);
    //now we have to show the snackbar for 2.5 seconds
    setSignupSnackbarState(true);
  }

  const handleCloseSignupSnackbar = () => {
    setSignupSnackbarState(false);
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
    setOpenComments(true);
  }

  const handleSaveComments = () => {
    console.log(`in handleSaveComments`);
    //do stuff with comments
    dispatch({
      type: 'CREATE_RIDE_COMMENT', payload: {
        rideID: rideDetails.id,
        creatorID: user.id,
        comment: newComment
      }
    })
    handleCloseComments(false);
  }

  const handleCloseComments = () => {
    setOpenComments(false);
  };

  const handleCloseConfirmDialogue = () => {
    setOpenConfirmDialogue(false);
  }

  const showCommentsButton = () => {
    let allowCommentsChange = false;
    if (user.id == rideDetails.creator_id ||
      user.id == rideDetails.driver_id) {
      allowCommentsChange = true;
    }
    return allowCommentsChange;
  }

  const showSignupSnackbar = () => {
    return (
      <div>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleCloseSignupSnackbar}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    )
  }

  return (
    <div>
      <Snackbar
        open={signupSnackbarState}
        autoHideDuration={2500}
        onClose={handleCloseSignupSnackbar}
        message="Driver Signup Successful!"
        action={showSignupSnackbar}
      />
      {/* Dialog for adding comments */}
      <Dialog open={openComments} onClose={handleCloseComments}>
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
            onChange={(event) => setNewComment(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseComments}>Cancel</Button>
          <Button onClick={handleSaveComments}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Dialogue for driver signup  */}
      <Dialog
        open={openConfirmDialogue}
        onClose={handleCloseConfirmDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Signup to driver?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm that you want to be the driver of this ride request.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialogue}>Disagree</Button>
          <Button onClick={dispatchDriverSignUp} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 1 }}>
        <Box
          sx={{
            display: 'flex',
            '& > :not(style)': {
              m: 1,
              width: 350
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
                  {gameText} at {new Date(rideDetails.event_timestamp).toLocaleTimeString(`en-US`, options)}.
                </Typography>
              </Box>
              <Box sx={{ mt: 1, mb: 1 }}>
                <Typography>
                  Pickup Location is {rideDetails.pickup_location} and dropoff is {rideDetails.dropoff_location}.
                </Typography>
              </Box >
              <Typography sx={{ mb: 1 }}>
                This is a {returnTripText}.
              </Typography>
              <Divider />
              <Box sx={{ mt: 3 }}>
                <Typography>Comments:</Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                {
                  rideComments.map((comment) => (
                    <Typography>{comment.text}</Typography>
                  ))
                }
              </Box>
            </CardContent>
            <CardActions>
              {showCommentsButton() ?
                <Button size="small" sx={{ mr: 7, ml: 1 }}
                  onClick={handleAddComments}>Add Comments
                </Button>
                :
                ''
              }
              {rideDetails.creator_id === user.id ?
                <Button size="small" sx={{ ml: 10 }}
                  onClick={handleDeleteRide}>Delete Ride</Button>
                :
                <Button size="medium"
                  onClick={handleSignUp}>Sign Up to Drive</Button>
              }
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </div >
  );
}

export default RideDetailsPaper;
