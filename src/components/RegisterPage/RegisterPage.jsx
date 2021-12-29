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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3, mt: 5 }}>
        <Grid item xs={12} >
          <Typography variant="h4" gutterBottom component="div">
            Create Account
          </Typography>
        </Grid>
      </Grid>
      <RegisterForm />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <Grid item>
          <Button variant="outlined" sx={{ width: '30ch', mt: 2 }}
            onClick={() => { history.push('/login') }}>Back to Login</Button>
        </Grid>
      </Box>
    </div>
  );
}

export default RegisterPage;
