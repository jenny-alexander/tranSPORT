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
      <h2 className="title">About tranSPORT</h2>
      <p className="app-description">tranSPORT is an application that simplifies the way caregivers share carpooling
        duties. Specifically, sports-centered carpooling duties. Currently, caregivers send carpool requests
        through various apps like Google chat, iMessage, GroupMe and email. These applications are already
        used for so many things that it can be hard to know when an important request is made. Using tranSPORT
        as the go-to application for sports carpooling families means that caregivers can easily access ride
        sharing information in one central location.
      </p>
      <h3 className="tech-header">Technology Used:</h3>
      <ul>
        <li>HTML</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Redux</li>
        <li>redux-saga</li>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>Axios</li>
        <li>PostgreSQL</li>
        <li>Material-UI</li>
      </ul>
      <h3 className="next-header">Next Steps:</h3>
      <div className="next-details">
        <ul>
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
