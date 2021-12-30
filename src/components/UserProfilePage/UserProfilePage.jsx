import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import UserProfileForm from '../UserProfileForm/UserProfileForm';

function UserProfilePage() {
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
            User Profile
          </Typography>
        </Grid>
      </Grid>
      <UserProfileForm />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <Grid item>
          <Button variant="outlined" sx={{ width: '30ch', mt: 2 }}
            onClick={() => { history.push('/login') }}>Back</Button>
        </Grid>
      </Box>
    </div>
  );
}

export default UserProfilePage;
