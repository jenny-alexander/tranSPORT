import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { styled, alpha } from '@mui/material/styles';
import MuiListItemButton from '@mui/material/ListItemButton';
import { AppBar,Toolbar, Typography, Button, Container } from '@mui/material';
import { Box, Drawer, Divider, InputBase } from '@mui/material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledInputBase = styled(InputBase)(
  ({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function MainNavigation() {
  const dispatch = useDispatch();
  //react useState hook to save the current open/close state of the drawer, normally variables dissapear afte the function was executed
  const [open, setState] = useState(false);

  const ListItemButton = styled(MuiListItemButton)({
    '&.active .MuiTypography-root': {
      fontWeight: 'bold',
      color: 'black'
    },
  });

  //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

    const handleLogout=()=>{
      toggleDrawer(false);
      dispatch({ type: 'LOGOUT' });
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" 
              style={{
                  color: "black", 
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 0px 0px 0px"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
               {/* The inside of the drawer */}
                 <Box elevation={5} sx={{
                   p: 2,
                   height: 1,
                 }}>
                   <IconButton sx={{mb: 2}}>
                     <CloseIcon onClick={toggleDrawer(false)} />
                  </IconButton>

                   <Divider sx={{mb: 2}} />

                   <Box sx={{mb: 2}} sx={{color: "black"}} >
                    <Link className="menuLink" to="/home"
                      onClick={toggleDrawer(false)}>
                      <ListItemButton>
                        <ListItemIcon>
                          <HomeIcon sx={{color: "primary.main"}}/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItemButton>
                     </Link>

                     <Link className="menuLink" to="/about"
                     onClick={toggleDrawer(false)}>
                     <ListItemButton>
                       <ListItemIcon>
                         <InfoIcon sx={{color: "primary.main"}}/>
                      </ListItemIcon >
                       <ListItemText primary="About" />
                    </ListItemButton>
                    </Link>

                    <Link className="menuLink" to='/login'
                      onClick={handleLogout}>
                    <ListItemButton>
                     <ListItemIcon>
                         <LogoutIcon sx={{color: "primary.main"}} />
                     </ListItemIcon>
                    <ListItemText primary="Logout" />
                   </ListItemButton>
                   </Link>

                </Box>                  
                  {/* <Box sx={{
                     display: "flex", 
                     justifyContent:"center", 
                     position: "absolute", 
                     bottom: "0", 
                     left: "50%", 
                     transform: "translate(-50%, 0)"}}
                   >
                     <Button variant="contained" sx={{m:1, width: .5}}>Register</Button>
                     <Button variant="outlined" sx={{m:1, width: .5}}>Login</Button> 
                   </Box> */}
                </Box>              
           </Drawer>
        </Toolbar>
      </AppBar>
    </Box>
  );
}