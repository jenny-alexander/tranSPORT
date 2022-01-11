import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import FaceIcon from '@mui/icons-material/Face';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, DialogContentText
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';


function UserProfileForm() {
  const [updatedUser, setUpdatedUser] = useState({})
  const [openConfirmDialogue, setOpenConfirmDialogue] = useState(false);
  const [updateSnackbarState, setUpdateSnackbarState] = useState(false);
  const errors = useSelector((store) => store.errors);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedUser(user)
  }, []);

  const handleUpdateProfile = () => {
    setOpenConfirmDialogue(true);
  }

  const handleCloseConfirmDialogue = () => {
    setOpenConfirmDialogue(false);
  }
  const updateProfile = (event) => {
    event.preventDefault();

    dispatch({
      type: 'UPDATE_USER',
      payload: {
        updatedUser
      },
    });
    //close the modal dialogue
    setOpenConfirmDialogue(false);

    setUpdateSnackbarState(true);
    //return updated info to screen
    dispatch({
      type: 'FETCH_USER',
      payload: {
        updatedUser
      }
    })
  };

  const handleCloseSignupSnackbar = () => {
    setUpdateSnackbarState(false);

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
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Snackbar
        open={updateSnackbarState}
        autoHideDuration={2500}
        onClose={handleCloseSignupSnackbar}
        message="Update Successful!"
        action={showSignupSnackbar}
      />
      {/* Dialog for updating profile */}
      <Dialog
        open={openConfirmDialogue}
        onClose={handleCloseConfirmDialogue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Update profile?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirm that you want to update your profile.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialogue}>No</Button>
          <Button onClick={updateProfile} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Container>
        <Box component="form" onSubmit={handleUpdateProfile}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Parent Name"
                id="parentName"
                sx={{ m: 1, width: '30ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                }}
                variant="standard"
                required
                value={updatedUser.parent_name}
                onChange={(event) => setUpdatedUser({ ...updatedUser, parent_name: event.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                id="email"
                sx={{ m: 1, width: '30ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                }}
                variant="standard"
                required
                value={updatedUser.email}
                onChange={(event) => setUpdatedUser({ ...updatedUser, email: event.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contact Number"
                id="contactNumber"
                sx={{ m: 1, width: '30ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><ContactPhoneIcon /></InputAdornment>,
                }}
                variant="standard"
                required
                value={updatedUser.phone_number}
                onChange={(event) => setUpdatedUser({ ...updatedUser, phone_number: event.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Player Name"
                id="playerName"
                sx={{ m: 1, width: '30ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><FaceIcon /></InputAdornment>,
                }}
                variant="standard"
                required
                value={updatedUser.player_name}
                onChange={(event) => setUpdatedUser({ ...updatedUser, player_name: event.target.value })}
              />
            </Grid>
            <Grid item sx={12}>
              <Button variant="contained" fullWidth
                sx={{ width: '30ch' }}
                onClick={handleUpdateProfile}>
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </div>
  );
}

export default UserProfileForm;
