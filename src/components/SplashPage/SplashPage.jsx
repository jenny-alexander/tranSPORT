import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
//TODO import CSS
import './SplashPage.css';

function SplashPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [name, setName] = useState('');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 15 }} >
      <img class='fade-in' src='images/logo2.png' alt='logo'></img>
    </Box>
  )
}

export default SplashPage;
