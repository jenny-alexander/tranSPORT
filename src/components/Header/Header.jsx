import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import Box from '@mui/material/Box';

function Header(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [name, setName] = useState('');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
        <img src='images/logo.png' alt='logo'></img>
    </Box>
  )
}

export default Header;
