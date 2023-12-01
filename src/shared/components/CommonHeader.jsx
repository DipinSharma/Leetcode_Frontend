import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button, Grid, Stack } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
 
export const CommonHeader = () => {
    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const {logout}=useLogout();
    const { user } = useAuthContext();
    React.useEffect(() => {
        setAuth(user&&user.username);
    }, [user]);
    const handleChange = (event) => {
        setAuth(!auth);
        handleClose();
        logout();
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
        <Box sx={{ flexGrow: 1, alignItems: 'center' }}>
            <AppBar position="static" sx={{ backgroundColor: "rgba(255, 255, 255, 0.16)", height: "3rem" }}>

                <Box sx={{ width: "100%" }}>
                    <Grid container>
                        <Grid xs></Grid>
                        <Grid xs={6} md={6} height={"3rem"}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 0, height: "3rem" }}>
                            CodeCraft
                            </Typography>

                        </Grid>
                        <Grid xs={6} md >
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
                        </Grid>
                        <Grid xs></Grid>
                    </Grid>
                </Box>
            </AppBar>
        </Box>);
}
