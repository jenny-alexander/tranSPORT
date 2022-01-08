import * as React from 'react';
import { useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import GlobalCSS from '../GlobalCSS/GlobalCSS';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const globalClasses = GlobalCSS();
  const history = useHistory();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogOut = () => {
    handleCloseNavMenu(null);
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AppBar position="sticky"

      style={{
        color: "white",
        backgroundColor: "#DDDDDD",
        boxShadow: "0px 0px 0px 0px",
        // borderRadius: 1
      }}>

      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}

            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: 'block',
              }}
            >
              <Link className={globalClasses.link} to="/home">
                <MenuItem key='home' onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Link>
              <Link className={globalClasses.link} to="/about">
                <MenuItem key='about' onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">About</Typography>
                </MenuItem>
              </Link>
              {/* Todo: Logout should show popup to confirm that user really wants to log out. */}
              <Link className={globalClasses.link} to='/login'>
                <MenuItem key='signout' onClick={handleLogOut}>
                  <Typography textAlign="center">LogOut</Typography>
                </MenuItem>
              </Link>
            </Menu>

          </Box>

          {/* ---> TODO: Logo shifts to left when page is too big. */}
          {/* <Box sx={{ flexGrow: 1, mb: 3 }}>
            <img src='images/logo2.png' alt='logo'></img>
          </Box> */}
          {/* ---> TODO: Logo shifts to left when page is too big. */}
          <Box >
            {/* TODO:---> Change color of icon to black */}
            <Tooltip title="User Profile">
              <IconButton color='primary' onClick={() => { history.push('/profile') }}>
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
