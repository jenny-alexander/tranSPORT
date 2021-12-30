import React from 'react';
import Box from '@mui/material/Box';

function Footer() {
  // return <footer>&copy; Jennifer Alexander</footer>;
  return (
    <Box sx={{
      //position="sticky",
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      bottom: "1%",

      left: "35%"
    }}>
      &copy; Jennifer Alexander
    </Box>
  )
}

export default Footer;
