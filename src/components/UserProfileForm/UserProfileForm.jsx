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

function UserProfileForm() {
  //const [profileExists, setProfileExists] = useState(false);

  const [updatedUser, setUpdatedUser] = useState({})

  const errors = useSelector((store) => store.errors);

  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedUser(user)
  }, []);

  const updateProfile = (event) => {
    console.log(`in updateProfile with user info:`, updatedUser)
    event.preventDefault();

    dispatch({
      type: 'UPDATE_USER',
      payload: {
        updatedUser
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
      <h3>{JSON.stringify(user)}</h3>
      <Container>
        <Box component="form" onSubmit={updateProfile}>
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
              <Button variant="contained" type="submit" name="submit" fullWidth
                sx={{ width: '30ch' }}>
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
