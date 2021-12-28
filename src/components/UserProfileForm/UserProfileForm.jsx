import React, { useState } from 'react';
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

function UserProfileForm() {
  const [profileExists, setProfileExists] = useState(false);

  const [userProfile, setUserProfile] = useState({
    parentName: '',
    email: '',
    contactNumber: '',
    playerName: ''
  })

  const errors = useSelector((store) => store.errors);
  const profile = useSelector((store) => store.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile.length != 0) {
      setProfileExists(true);
    }
  }, []);

  const createProfile = (event) => {
    event.preventDefault();

    //This will start the process of adding the user profile
    //to the user_profile table.
    //Eventually, we will need a way to update the user profile via menu
    dispatch({
      type: 'CREATE_PROFILE',
      payload: {
        profile
      },
    });
  };

  const handleProfileChange = (event) => {

  }

  const updateProfile = (event) => {
    event.preventDefault();

    //This will start the process of adding the user profile
    //to the user_profile table.
    //Eventually, we will need a way to update the user profile via menu
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: {
        profile
      },
    });
  };

  return (
    <div>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Container>
        <Box component="form" onSubmit={handleProfileChange}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
            {/* <Grid item sx={12}>
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
            </Grid> */}
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
                // onChange={(event) => setParentName(event.target.value)}
                onChange={(event) => setUserProfile({ ...userProfile, parentName: event.target.value })}
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
                // onChange={(event) => setEmail(event.target.value)}
                onChange={(event) => setUserProfile({ ...userProfile, email: event.target.value })}
              />
            </Grid>
            <Grid item sx={12}>
              <TextField
                label="Contact Number"
                id="contactNumber"
                sx={{ m: 1, width: '30ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><ContactPhoneIcon /></InputAdornment>,
                }}
                variant="standard"
                required
                value={userProfile.contactNumber}
                // onChange={(event) => setContactNumber(event.target.value)}
                onChange={(event) => setUserProfile({ ...userProfile, contactNumber: event.target.value })}
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
                // onChange={(event) => setPlayerName(event.target.value)}
                onChange={(event) => setUserProfile({ ...userProfile, playerName: event.target.value })}
              />
            </Grid>
            <Grid item sx={12}>
              <Button variant="contained" type="submit" name="submit" fullWidth
                sx={{ width: '30ch' }}>Create Profile</Button>
            </Grid>
          </Grid>
        </Box>

      </Container>
    </div>
  );
}

export default UserProfileForm;
