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
import MuiPhoneNumber from 'material-ui-phone-number';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [email, setEmail] = useState('');
  const [userProfile, setUserProfile] = useState({
    parentName: '',
    email: '',
    phoneNumber: '',
    playerName: ''
  });

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        userProfile: userProfile
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
        <Box component="form" onSubmit={registerUser}>
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
                // onChange={(event) => setParentName(event.target.value)}
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
                // onChange={(event) => setPlayerName(event.target.value)}
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
                // onChange={(event) => setContactNumber(event.target.value)}
                onChange={(event) => setUserProfile({ ...userProfile, phoneNumber: event.target.value })}
              />
              {/* <MuiPhoneNumber defaultCountry={'us'}
                label="Phone Number"
                id="phoneNumber"
                sx={{ m: 1, width: '30ch' }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><ContactPhoneIcon /></InputAdornment>,
                }}
                variant="standard"
                required
                // value={userProfile.phoneNumber}
                onChange={(event) => setUserProfile({ ...userProfile, phoneNumber: event.target.value })}
              /> */}
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

  // return (
  //   <form className="formPanel" onSubmit={registerUser}>
  //     <h2>Register Yourself!</h2>
  //     {errors.registrationMessage && (
  //       <h3 className="alert" role="alert">
  //         {errors.registrationMessage}
  //       </h3>
  //     )}
  //     <div>
  //       <label htmlFor="username">
  //         Username:
  //         <input
  //           type="text"
  //           name="username"
  //           value={username}
  //           required
  //           onChange={(event) => setUsername(event.target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <label htmlFor="password">
  //         Password:
  //         <input
  //           type="password"
  //           name="password"
  //           value={password}
  //           required
  //           onChange={(event) => setPassword(event.target.value)}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <input className="btn" type="submit" name="submit" value="Register" />
  //     </div>
  //   </form>
  // );
}

export default RegisterForm;
