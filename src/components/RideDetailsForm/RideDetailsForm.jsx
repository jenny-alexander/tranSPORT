import React, { useState } from 'react';
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

  const handleSignUp = () => {
    console.log(`in handleSignUp!`);
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
            spacing={3}
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
                required
                value='My player'
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
