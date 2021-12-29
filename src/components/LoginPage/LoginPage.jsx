import React, { useEffect, useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import SplashPage from '../SplashPage/SplashPage';
import { Box, Button, Grid } from '@mui/material';
import './LoginPage.css';
import { Typography } from '@mui/material';

function LoginPage() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  //--->TODO: Need to store a value in a store to say that we loaded the splash
  //screen once already and don't do it again.
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500)
  }, []);

  return isLoading ?
    (<SplashPage />) :

    // return (
    (
      <div>
        {/* <img class='splash'
          src='images/logo.png'
          alt='logo' /> */}
        {/* <Header /> */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 10 }} >
          <Typography variant="h4" sx={{ mb: 5, mt: 3 }}>
            Log-in
          </Typography>
        </Box>
        <LoginForm />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <Grid item>
            <Button variant="outlined" sx={{ width: '30ch', mt: 2 }}
              onClick={() => { history.push('/registration') }}>No account? Sign Up!</Button>
          </Grid>
        </Box>
      </div>
    );
}

export default LoginPage;
