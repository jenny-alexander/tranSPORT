import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Container>
        <Box component="form" onSubmit={login}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
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
                sx={{ fontWeight: 'bold', width: '30ch', mb: 1 }}>Login</Button>
            </Grid>
          </Grid>
        </Box>


      </Container>
    </div>
  );
}

export default LoginForm;
