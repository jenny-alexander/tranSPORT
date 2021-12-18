import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import { Box, Button, Grid } from '@mui/material';
import Container from '@mui/material/Container';
import './LoginPage.css';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      {/* <center>
        <img src="/images/logo.png" alt="transport logo"/>
      </center> */}
      <Header />
      <LoginForm />
      {/* <Container 
        justifyContent="center"
        alignItems="flex-end"
      >
        <Button variant="contained" fullWidth
        onClick={()=>{
          history.push('/registration');
        }}>Don't have an account? Sign Up!</Button>
      </Container>    */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <Grid item>
          <Button variant="text" sx={{mt:2}}
                  onClick={()=>{history.push('/registration')}}>Don't have an account? Sign up!</Button>
        </Grid>
      </Box>      
      {/* <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center> */}
    </div>
  );
}

export default LoginPage;
