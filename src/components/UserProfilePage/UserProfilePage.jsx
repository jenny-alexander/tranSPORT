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
      <Box sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }} >
        <Grid item xs={4} sx={{ mb: 5, ml: 2, mt: 1 }}>
          <Typography variant="h4" gutterBottom component="div">
            Create a Profile to Continue
          </Typography>
        </Grid>
      </Box>
      <UserProfileForm />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <Grid item>
          <Button variant="outlined" sx={{ width: '30ch', mt: 2 }}
            onClick={() => { history.push('/login') }}>Cancel</Button>
        </Grid>
      </Box>
    </div>
  );
}

export default UserProfilePage;
