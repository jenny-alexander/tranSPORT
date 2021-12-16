import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

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
                  id="outlined-basic" 
                  label="Username" 
                  variant="outlined" 
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Grid>
              <Grid item sx={12}>
                <TextField 
                  id="outlined-basic" 
                  label="Password" 
                  variant="outlined" 
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item sx={12}>
                <TextField 
                  id="outlined-basic" 
                  label="Re-enter Password" 
                  type="password"
                  variant="outlined" 
                  required
                  value={passwordCheck}
                  onChange={(event) => setPasswordCheck(event.target.value)}
                />
              </Grid>
              <Grid item sx={12}>
                <TextField 
                  id="outlined-basic" 
                  label="Parent Full Name" 
                  variant="outlined" 
                  required
                  value={parentName}
                  onChange={(event) => setParentName(event.target.value)}
                />
              </Grid>
              <Grid item sx={12}>
                <TextField 
                  id="outlined-basic" 
                  label="Child Name" 
                  variant="outlined" 
                  required
                  value={childName}
                  onChange={(event) => setChildName(event.target.value)}
                />
              </Grid>                                               
              <Grid item sx={12}>
                <Button variant="contained" type="submit" name="submit">Register</Button>
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
