import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function RideDetailsPage(props) {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const handleSignUp = () => {
    console.log(`in handleSignUp!`);
    console.log(`id from params is:`, id);
  }

  return (
    <div>
      <Container>
        <Box component="form" onSubmit={handleSignUp}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            {/* Textfields containing user input */}
            <Grid item xs={12}>
              <TextField
                disabled
                label="Player Name"
                id="playerName"
                sx={{ m: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value='My player'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Event Date"
                id="pickupDate"
                sx={{ m: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value='Dec 30 2021'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Event Time"
                id="pickupTime"
                sx={{ m: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value='8:30 PM'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Pickup Location"
                id="pickupLocation"
                sx={{ m: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value='My house'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Dropoff Location"
                id="dropoffLocation"
                sx={{ m: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value='The rink'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Event Type"
                id="eventType"
                sx={{ m: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value='Game'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                label="Return Trip"
                id="returnTrip"
                sx={{ m: 1, width: '30ch' }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                value='Yes'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                id="comments"
                label="Comments"
                multiline
                rows={4}
                sx={{ m: 1, width: '30ch', fontSize: 17 }}
                InputLabelProps={{
                  shrink: true,
                }}
                value='These are my comments.'
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                right: "2%"
              }}>
                <Button variant="contained" type="submit" name="submit"
                  sx={{ width: '23ch', m: 1 }}
                >
                  Sign Up As Driver!
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div >
  );
}

export default RideDetailsPage;
