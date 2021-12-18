import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import { Box, Button, Grid } from '@mui/material';
import './LoginPage.css';
import { Typography, Divider } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      {/* TODO: Add Logo?????*/}
      <Header />
      <LoginForm />
      {/* <Divider><Typography>or</Typography></Divider> */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
        <Grid item>
          <Button variant="outlined" sx={{width: '30ch', mt:2}}
                  onClick={()=>{history.push('/registration')}}>No account? Sign Up!</Button>
        </Grid>
      </Box>      
    </div>
  );
}

export default LoginPage;
