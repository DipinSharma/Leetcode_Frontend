import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Stopwatch from './StopWatch';
import { useAuthContext } from '../hooks/useAuthContext';
import { Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
export const Header = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {logout}=useLogout();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useAuthContext();
  React.useEffect(() => {
    setAuth(user && user.username);
  }, [user]);
  const handleChange = (event) => {
    setAuth(!auth);
    handleClose();
    logout();
  };

  const navigate = useNavigate();  // Get the history object
  const handleLoginClick = () => {
      navigate('/login');
  };
  const handleSignInClick = () => {
      navigate('/signIn');
  };
  const handleProfileOpen=()=>{
      navigate(`/profile/${user.username}`);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static" sx={{ backgroundColor: "rgba(255, 255, 255, 0.16)" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <LeftDrawer/> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to={`/allQuestions`}style={{ textDecoration: "none", color: "inherit" }}>CodeCraft</Link>
          </Typography>
          <Stopwatch />
          {auth && (
            <div className='AuthPic'>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appBar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appBar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {user && (
                  <MenuItem 
                  // onClick={handleProfileOpen}
                  >{auth}</MenuItem>
                )}
                <MenuItem onClick={handleChange}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
          {!auth && (
            <Stack direction="row" spacing={5} className='AuthPic'>
              <Button variant='contained' onClick={handleLoginClick}>Login</Button>
              <Button variant='contained' onClick={handleSignInClick}>Sign In</Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>);
}
