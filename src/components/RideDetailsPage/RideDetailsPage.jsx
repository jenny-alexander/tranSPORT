import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function RideDetailsPage(props) {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3, mt: 3 }}>
        <Grid item xs={12} >
          <Typography gutterBottom component="div"
            sx={{ fontSize: 28 }}>
            Ride Details
          </Typography>
        </Grid>
      </Grid>
      <Container>
        {/* <CreateRideForm /> */}

        <Grid item xs={12}>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            left: "2%"
          }}>
            <Button variant="outlined" sx={{ width: '20ch', m: 1 }}
              onClick={() => { history.push('/view/allrides') }}>
              Back to List
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            right: "2%"
          }}>
            <Button variant="contained" type="submit" name="submit"
              sx={{ width: '20ch', m: 1 }}
            >
              Sign Up As Driver!
            </Button>
          </Box>
        </Grid>
      </Container>
    </div >
  );
}

export default RideDetailsPage;
