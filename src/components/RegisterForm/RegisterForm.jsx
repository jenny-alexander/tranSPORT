import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import FaceIcon from '@mui/icons-material/Face';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, DialogContentText
} from '@mui/material';

function RegisterForm() {
  const [openRegistrationDialogue, setOpenRegistrationDialogue] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userProfile, setUserProfile] = useState({
    parentName: '',
    email: '',
    phoneNumber: '',
    playerName: ''
  });

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  // const registerUser = (event) => {
  //   event.preventDefault();

  //   dispatch({
  //     type: 'REGISTER',
  //     payload: {
  //       username: username,
  //       password: password,
  //       userProfile: userProfile
  //     },
  //   });
  // };


  {/* ---> BEGIN Logic related to driver withdrawal*/ }
  const handleRegisterUser = () => {
    //Show modal dialogue to confirm sign up.
    setOpenRegistrationDialogue(true);
  }
  const dispatchRegisterUser = () => {
    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        userProfile: userProfile
      },
    })
    //close the modal dialogue
    setOpenRegistrationDialogue(false);
    //now we have to show the snackbar for 2.5 seconds
    setSnackbarMessage('User Registration Successful!')
    setSnackbarState(true);
  }
  const handleCloseRegistrationDialogue = () => {
    setOpenRegistrationDialogue(false);
  }
  {/* ---> END Logic related to driver withdrawal*/ }
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
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Snackbar
        open={snackbarState}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={showSnackbar}
      />
      {/* Dialogue for driver signup  */}
      <Dialog
        open={openRegistrationDialogue}
        onClose={handleCloseRegistrationDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Register New User?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm that you want to register as a new user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRegistrationDialogue}>No</Button>
          <Button onClick={dispatchRegisterUser} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Container>
        <Box component="form" onSubmit={handleRegisterUser}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}>

            <Grid item sx={12}>
              <TextField
                label="Username"
                id="username"
                sx={{ m: 1, width: '30ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>,
                }}
                variant="standard"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item sx={12}>
              <TextField
                type="password"
                label="Password"
                id="password"
                sx={{ m: 1, width: '30ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment>,
                }}
                variant="standard"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item sx={12}>
              <TextField
                label="Email"
                id="email"
                sx={{ m: 1, width: '30ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                }}
                variant="standard"
                required
                value={userProfile.email}
                onChange={(event) => setUserProfile({ ...userProfile, email: event.target.value })}
              />
            </Grid>
            <Grid item sx={12}>
              <TextField
                label="Parent Name"
                id="parentName"
                sx={{ m: 1, width: '30ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                }}
                variant="standard"
                required
                value={userProfile.parentName}
                onChange={(event) => setUserProfile({ ...userProfile, parentName: event.target.value })}
              />
            </Grid>
            <Grid item sx={12}>
              <TextField
                label="Player Name"
                id="playerName"
                sx={{ m: 1, width: '30ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><FaceIcon /></InputAdornment>,
                }}
                variant="standard"
                required
                value={userProfile.playerName}
                onChange={(event) => setUserProfile({ ...userProfile, playerName: event.target.value })}
              />
            </Grid>
            <Grid item sx={12}>
              <TextField
                label="Phone Number"
                id="phoneNumber"
                sx={{ m: 1, width: '30ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><ContactPhoneIcon /></InputAdornment>,
                }}
                variant="standard"
                required
                value={userProfile.phoneNumber}
                onChange={(event) => setUserProfile({ ...userProfile, phoneNumber: event.target.value })}
              />
            </Grid>
            <Grid item sx={12}>
              <Button variant="contained" type="submit" name="submit" fullWidth
                sx={{ width: '30ch' }}>Register</Button>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </div>
  );
}

export default RegisterForm;
