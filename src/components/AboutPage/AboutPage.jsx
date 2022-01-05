import React from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import './AboutPage.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
        <img src='images/logo2.png'></img>
      </Box> */}
      <h2 className="title">About tranSPORT</h2>
      <h3 className="tech-header">Technology Used:</h3>
      <ul>
        <li>HTML/JS</li>
        <li>React</li>
        <li>Redux-Saga</li>
        <li>Express.js and Node.js</li>
        <li>Material-UI</li>
        <li>PostgreSQL</li>
        <li>emailJS</li>
        <li>Google MAPS Places API</li>
      </ul>
      <h3 className="next-header">Next Steps:</h3>
      <div className="next-details">
        <ul>
          <li>Implement email functionality whereby users will receive an email if:
            <ul>
              <li>someone signs up to be a driver for their ride.</li>
              <li>comments are added to a ride they are involved in.</li>
              <li>a driver withdraws from a ride.</li>
            </ul>
          </li>
          <li>Implement Google Maps Places Autocomplete functionality when a user enters a location
            when creating a new ride request.
          </li>
        </ul>
      </div>
      <h3 className="thank-you-header">Thank You:</h3>
      <ul>
        <li>Ionian cohort members and Dev</li>
        <li>Husband and kids</li>
      </ul>
    </div>


  );
}

export default AboutPage;
