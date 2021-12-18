import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left'}} >
        <Grid item xs={4} sx={{mb:5, ml:2, mt:1}}>
          <Typography variant="h4" gutterBottom component="div">
            Create Account
          </Typography>
        </Grid>          
      </Box>
      <RegisterForm />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <Grid item>
          <Button variant="outlined" sx={{width: '30ch', mt:2}}
                  onClick={()=>{history.push('/login')}}>Back to Login</Button>
        </Grid>
      </Box>
    </div>
  );
}

export default RegisterPage;
