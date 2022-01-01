import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Container, Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function HomePage(props) {
  const [profileButtonText, setProfileButtonText] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div>
      <div class='title'>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <Typography sx={{ mb: 5, mt: 5, fontSize: 28 }}>
            What would you like to do?
          </Typography>
        </Box>
      </div>
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}>
          <Grid item sx={12}>
            <Button variant="contained"
              sx={{ width: '30ch', height: '7ch', borderRadius: 7 }}
              onClick={() => { history.push('/create') }}>Create Ride Request</Button>
          </Grid>
          <Grid item sx={12}>
            <Button
              variant="contained"
              sx={{ width: '30ch', height: '7ch', borderRadius: 7 }}
              onClick={() => { history.push('/view/myrides') }}>View My Rides
            </Button>
          </Grid>
          <Grid item sx={12}>
            <Button variant="outlined"
              sx={{ width: '30ch', height: '7ch', borderRadius: 7 }}
              onClick={() => { history.push('/view/allrides') }}>View All Rides
            </Button>
          </Grid>
          {/* <Grid item sx={12}>
            <Button variant="outlined"
              sx={{ width: '30ch', height: '7ch', borderRadius: 7 }}
              startIcon={<AccountCircleIcon />}
              onClick={() => { history.push('/profile') }}>
              View Profile
            </Button>
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
