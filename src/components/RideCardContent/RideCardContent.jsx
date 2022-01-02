import React, { useEffect } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import HailIcon from '@mui/icons-material/Hail';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SportsHockeyIcon from '@mui/icons-material/SportsHockey';

const options = { hour: "2-digit", minute: "2-digit" };

function RideCardContent(props) {
  return (
    <div>
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={9}>
            <Typography sx={{ fontSize: '22px', fontWeight: 600 }} >
              {new Date(props.ride.event_timestamp).toLocaleDateString()}
            </Typography>
            <Typography sx={{ fontSize: '20px', fontWeight: 500 }} >
              {new Date(props.ride.event_timestamp).toLocaleTimeString(`en-US`, options)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <SportsHockeyIcon sx={{ mr: 1 }} />
              <Typography sx={{ fontSize: '16px', fontWeight: 500 }} >
                {
                  props.ride.game ? 'Game' : 'Practice'
                }
              </Typography>
            </Box>
            <Typography sx={{ mt: 3, fontSize: '14px', fontWeight: 500 }} >
              {props.ride.player_name}
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }}>
            {props.ride.ride_status === 'Needs Driver!' ?
              <HailIcon sx={{ fontSize: 50 }} /> :
              <DirectionsCarIcon sx={{ fontSize: 40 }} />
            }
          </Grid>
        </Grid>
      </CardContent>
    </div>
  )
}
export default RideCardContent;