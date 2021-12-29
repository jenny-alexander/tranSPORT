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
import './ResponsiveAppBar.css';
import GlobalCSS from '../GlobalCSS/GlobalCSS';
import Grid from '@mui/material/Grid';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const globalClasses = GlobalCSS();

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
        color: "black",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 0px 0px 0px"
      }}>

      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                display: { xs: 'block', md: 'none' },
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

          <Box sx={{ flexGrow: 1 }}>
            <img src='images/logo.png' alt='logo'></img>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
