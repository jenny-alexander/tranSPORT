import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email,
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
            spacing={3}>
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
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
