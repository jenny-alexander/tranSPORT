import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Container, Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useTheme } from '@mui/styles';

function HomePage(props) {
  const [profileButtonText, setProfileButtonText] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();

  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#8C92AC"
  //     },
  //     secondary: {
  //       main: "#de2bfa"
  //     }
  //   },
  // });

  return (
    <div>
      <div class='title'>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <img src='images/logo2.png'></img>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
          <Typography sx={{ mb: 5, mt: 1, fontSize: 28 }}>
            What would you like to do?
          </Typography>
        </Box>
      </div>
      {/* <ThemeProvider theme={theme}> */}

      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}>
          <Grid item sx={12}>
            <Button variant="contained"
              sx={{ fontWeight: 'bold', width: '30ch', height: '7ch', borderRadius: 7 }}
              onClick={() => { history.push('/create') }}>Create Ride Request</Button>
          </Grid>
          <Grid item sx={12}>
            <Button
              //color="primary"
              variant="contained"
              sx={{ fontWeight: 'bold', width: '30ch', height: '7ch', borderRadius: 7 }}
              onClick={() => { history.push('/view/myrides') }}>View My Rides
            </Button>
          </Grid>
          <Grid item sx={12}>
            <Button variant="outlined"
              sx={{ fontWeight: 'bold', width: '30ch', height: '7ch', borderRadius: 7 }}
              onClick={() => { history.push('/view/allrides') }}>View All Rides
            </Button>
          </Grid>

        </Grid>
      </Container>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <img src='images/logo2.png'></img>
      </Box> */}
      {/* </ThemeProvider> */}
    </div>
  );
}

export default HomePage;
