import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, DialogContentText, StyledEngineProvider
} from '@mui/material';
import { Card, CardContent, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function RideDetailsPaper(props) {
  const [openComments, setOpenComments] = useState(false); //this is for the modal confirmation 
  const [openSignupDialogue, setOpenSignupDialogue] = useState(false);
  const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
  const [openWithdrawDialogue, setOpenWithdrawDialogue] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [returnTripText, setReturnTripText] = useState('');
  const [gameText, setGameText] = useState('');
  const [newComment, setNewComment] = useState('');
  const rideComments = useSelector(store => store.comment)
  const rideDetails = useSelector(store => store.rideDetails);
  const params = useParams();
  const user = useSelector(store => store.user);
  let lastPageVisited = '';
  const dispatch = useDispatch();
  const history = useHistory();
  const options = { hour: "2-digit", minute: "2-digit" };
  let myStorage = window.sessionStorage;

  useEffect(() => {
    //Setting session storage with ride id to be used when user signs up
    //to be the driver or withdraws as the driver.
    myStorage.setItem('ride_id', params.id)
    dispatch({
      type: 'FETCH_RIDE_BY_ID',
      payload: params.id
    })
    //Changing True/False values from DB to Yes/No
    rideDetails.return_trip ? setReturnTripText('return trip') : setReturnTripText('one way trip');
    // rideDetails.game ? setGameText(' game') : setGameText(' practice');
    dispatch({ type: 'FETCH_RIDE_COMMENTS', payload: params.id });
  }, [params.id]);

  {/* ---> BEGIN Logic related to driver signup*/ }
  const handleSignUp = () => {
    //Show modal dialogue to confirm sign up.
    setOpenSignupDialogue(true);
  }
  const dispatchDriverSignUp = () => {
    dispatch({
      type: 'UPDATE_RIDE_WITH_DRIVER',
      payload: {
        userID: user.id,
        rideID: rideDetails.id,
        driver_name: user.parent_name
      },
    })
    //close the modal dialogue
    setOpenSignupDialogue(false);
    //now we have to show the snackbar for 2.5 seconds
    setSnackbarMessage('Driver Signup Successful!')
    setSnackbarState(true);

    dispatch({
      type: 'FETCH_RIDE_BY_ID',
      payload: params.id
    })

    //reload the page with updated driver
    history.push(`/ride-details/${myStorage.getItem('ride_id')}`)
  }
  const handleCloseSignupDialogue = () => {
    setOpenSignupDialogue(false);
  }
  {/* ---> END Logic related to driver signup*/ }

  {/* ---> BEGIN Logic related to driver withdrawal*/ }
  const handleWithdrawDriver = () => {
    //Show modal dialogue to confirm sign up.
    setOpenWithdrawDialogue(true);
  }
  const dispatchWithdrawDriver = () => {
    dispatch({
      type: 'REMOVE_DRIVER_FROM_RIDE',
      payload: {
        userID: user.id,
        rideID: rideDetails.id
      },
    })
    //close the modal dialogue
    setOpenWithdrawDialogue(false);
    //now we have to show the snackbar for 2.5 seconds
    setSnackbarMessage('Driver Withdrawal Successful!')
    setSnackbarState(true);

    dispatch({
      type: 'FETCH_RIDE_BY_ID',
      payload: params.id
    })
    //reload the page with udpated driver
    history.push(`/ride-details/${myStorage.getItem('ride_id')}`)
  }
  const handleCloseWithdrawDialogue = () => {
    setOpenDeleteDialogue(false);
  }
  {/* ---> END Logic related to driver withdrawal*/ }

  {/* ---> BEGIN Logic related to deleting ride*/ }
  const handleDeleteRide = () => {
    //Show modal for deleting ride
    setOpenDeleteDialogue(true);
  }
  const dispatchDeleteRide = () => {
    dispatch({
      type: 'DELETE_RIDE_REQUEST',
      payload: rideDetails.id
    })
    //close the modal dialogue
    setOpenDeleteDialogue(false);
    //now we have to show the snackbar for 2.5 seconds
    setSnackbarMessage('Ride deleted successfully.')
    setSnackbarState(true);

    delayedNavigation();
  }

  const handleCloseDeleteDialogue = () => {
    setOpenDeleteDialogue(false);
  }
  {/* ---> END Logic related to deleting ride*/ }

  {/* ---> BEGIN Logic related to adding comme nts*/ }
  const handleAddComments = () => {
    setOpenComments(true);
  }
  const handleSaveComments = () => {
    //do stuff with comments
    dispatch({
      type: 'CREATE_RIDE_COMMENT', payload: {
        rideID: rideDetails.id,
        creatorID: user.id,
        comment: newComment
      }
    })
    handleCloseComments(false);
    setSnackbarMessage('Comments added!')
    setSnackbarState(true);
  }
  const handleCloseComments = () => {
    setOpenComments(false);
  };
  {/* ---> END Logic related to adding comme nts*/ }

  {/* ---> BEGIN Logic related to button rendering*/ }
  const showCommentsButton = () => {
    let allowCommentsChange = false;
    if (user.id == rideDetails.creator_id ||
      user.id == rideDetails.driver_id) {
      allowCommentsChange = true;
    }
    return allowCommentsChange;
  }

  const showSignupToDriveBtn = () => {
    let allowDriverSignup = false;

    if (rideDetails.driver_id === null) {
      if (rideDetails.creator_id != user.id) {
        allowDriverSignup = true;
      }
    }
    return allowDriverSignup;
  }
  const showDriverRemovalBtn = () => {
    let allowDriverRemoval = false;

    if (rideDetails.driver_id === user.id) {
      allowDriverRemoval = true;
    }
    return allowDriverRemoval;
  }
  const showDeleteRideBtn = () => {
    let allowDeleteRide = false;

    if (rideDetails.creator_id === user.id) {
      allowDeleteRide = true;
    }
    return allowDeleteRide;
  }
  {/* <--- END Logic related to button rendering*/ }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function delayedNavigation() {
    console.log(`in delayedNavigation`)
    await sleep(2000);
    console.log(`after delayedNavigation`)
    history.goBack();
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
  const handleCloseSnackbar = () => {
    setSnackbarState(false);
  }

  return (
    <div>
      <Snackbar
        open={snackbarState}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={showSnackbar}
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
        open={openSignupDialogue}
        onClose={handleCloseSignupDialogue}
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
          <Button onClick={handleCloseSignupDialogue}>No</Button>
          <Button onClick={dispatchDriverSignUp} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialogue for deleting ride  */}
      <Dialog
        open={openDeleteDialogue}
        onClose={handleCloseDeleteDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Ride Request?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm that you want to delete this ride request.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialogue}>No</Button>
          <Button onClick={dispatchDeleteRide} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialogue for driver withdrawal  */}
      <Dialog
        open={openWithdrawDialogue}
        onClose={handleCloseWithdrawDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Withdraw as Driver?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm that you want to withdraw as driver from this ride.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseWithdrawDialogue}>No</Button>
          <Button onClick={dispatchWithdrawDriver} autoFocus>
            Yes
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
          {/* <h3>{JSON.stringify(rideDetails)}</h3> */}
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
                  {rideDetails.game ? ' game' : ' practice'} at {new Date(rideDetails.event_timestamp).toLocaleTimeString(`en-US`, options)}.
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
              <Box sx={{ display: 'flex' }}>
                {showCommentsButton() ?
                  <Button variant="contained" size="small" sx={{ ml: 1 }}
                    sx={{ fontWeight: 'bold', alignItems: 'right' }}
                    onClick={handleAddComments}>Add Comments
                  </Button>
                  :
                  ''
                }
                {showSignupToDriveBtn() ?
                  <Button variant="contained" size="small"
                    sx={{ fontWeight: 'bold' }}
                    onClick={handleSignUp}>Sign Up to Drive</Button>
                  :
                  ''
                }
                {showDriverRemovalBtn() ?
                  <Button variant="contained" size="small"
                    onClick={handleWithdrawDriver}
                    sx={{ fontWeight: 'bold', ml: 8, justifyContent: 'right', alignItems: 'right' }}
                  >Withdraw as driver</Button>
                  :
                  ''
                }
                {showDeleteRideBtn() ?
                  <Button variant="contained" size="small"
                    sx={{ fontWeight: 'bold', width: '18ch', ml: 10 }}
                    onClick={handleDeleteRide}>Delete Ride</Button>
                  :
                  ''
                }
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Grid>
    </div >
  );
}

export default RideDetailsPaper;
