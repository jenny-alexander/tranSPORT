import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name HomePage with the name for the new component.
function HomePage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');
  const history = useHistory();
  
  const theme = createTheme({
    palette: {
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });


  return (
    <div>
      <Container>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
              <Grid item sx={12}>
                <Button variant="contained" onClick={()=>{history.push('/create')}}>Create Ride Request</Button>
              </Grid>
              <Grid item sx={12}>
                <Button variant="contained" onClick={()=>{history.push('/view/myrides')}}>View My Rides</Button>
              </Grid>
              <Grid item sx={12}>
                <Button onClick={()=>{history.push('/view/allrides')}}>View All Rides</Button>
              </Grid>              
          </Grid>

      </Container>
    </div>
  );
}

export default HomePage;
