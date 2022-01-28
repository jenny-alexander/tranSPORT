import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';
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
  const [driver, setDriver] = useState('');
  const rideComments = useSelector(store => store.comment)
  const rideDetails = useSelector(store => store.rideDetails);
  const params = useParams();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const options = { hour: "2-digit", minute: "2-digit" };
  const DRIVER_SIGNUP = 'signup';
  const WITHDRAW_DRIVER = 'withdraw';

  useEffect(() => {
    dispatch({
      type: 'FETCH_RIDE_BY_ID',
      payload: params.id
    })
    //Changing True/False values from DB to Yes/No
    rideDetails.return_trip ? setReturnTripText('return trip') : setReturnTripText('one way trip');
    dispatch({ type: 'FETCH_RIDE_COMMENTS', payload: params.id });

    setDriver(rideDetails.driver);
  }, []);

  const sendEmailWithParams = (params) => {
    emailjs.send('service_p91n93t', 'template_coydgje', params, 'user_gfwvdLdSZBDHPQhbMw1bz')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

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
    setDriver(user.parent_name);
    //close the modal dialogue
    setOpenSignupDialogue(false);

    //now we have to show the snackbar for 2.5 seconds
    setSnackbarMessage('Driver Signup Successful!')
    setSnackbarState(true);

    dispatch({
      type: 'FETCH_RIDE_BY_ID',
      payload: params.id
    })
  }
  const handleCloseSignupDialogue = () => {
    setOpenSignupDialogue(false);
  }

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
    setDriver('');
    //close the modal dialogue
    setOpenWithdrawDialogue(false);
    //now we have to show the snackbar for 2.5 seconds
    setSnackbarMessage('Driver Withdrawal Successful!')
    setSnackbarState(true);

    dispatch({
      type: 'FETCH_RIDE_BY_ID',
      payload: params.id
    })

  }
  const formatEmail = (type) => {
    switch (type) {
      case WITHDRAW_DRIVER:
        emailTemplateParams = {
          subject: 'A driver has withdrawn from your ride!',
          to_name: user.parent_name,
          from_name: 'tranSPORT Rideshare App',
          message: `${driver_name} has WITHDRAWN as driver for your ride on 
                    ${new Date(rideDetails.event_timestamp).toLocaleDateString()} at 
                    ${new Date(rideDetails.event_timestamp).toLocaleTimeString(`en-US`, options)}.\n
                        
                    Do not reply to this message.`
        };
      case DRIVER_SIGNUP:
        emailTemplateParams = {
          subject: 'A driver has signed up for your ride!',
          to_name: user.parent_name,
          from_name: 'tranSPORT Rideshare App',
          message: `${driver_name} has signed up to be a driver for your ride on 
                    ${new Date(rideDetails.event_timestamp).toLocaleDateString()} at 
                    ${new Date(rideDetails.event_timestamp).toLocaleTimeString(`en-US`, options)}.\n
                        
                    Do not reply to this message.`
        };
    }

  }
  const handleCloseWithdrawDialogue = () => {
    setOpenDeleteDialogue(false);
  }

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

  const handleAddComments = () => {
    setOpenComments(true);
  }
  const handleSaveComments = () => {
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

    if (typeof driver == "undefined") {
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

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function delayedNavigation() {
    await sleep(3000);
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

  function Driver(props) {
    let driverText = `Driver Needed!`;
    const ASSIGNED_DRIVER = `Assigned Driver is: `;
    if (rideDetails.driver !== null) {
      setDriver(rideDetails.driver)
      driverText = ASSIGNED_DRIVER + driver;
    } else {
      if (typeof driver != "undefined") {
        driverText = ASSIGNED_DRIVER + driver;
      }
    }
    return (
      <h4>{driverText}</h4>
    )
  }

  return (
    <div>
      <Snackbar
        open={snackbarState}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={showSnackbar}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
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
          {"Signup to drive?"}
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
          <Card
            elevation={1}
            sx={{ m: 1 }} >
            <CardContent >
              <Driver />
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
                    sx={{ fontWeight: 'bold', justifyContent: 'right', alignItems: 'right' }}
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
