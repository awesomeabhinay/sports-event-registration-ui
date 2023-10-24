import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/");
        localStorage.removeItem('username');
    };
    const user = localStorage.getItem("username");
    return (
        <AppBar position="static">
            <Toolbar>
                <Box>
                    <Typography variant="h6"><i>Sports Day</i></Typography>
                </Box>
                <Button color="inherit" component={Link} to='/'>Home</Button>
                {user && <Button color="inherit" component={Link} to='/events'>Events</Button>}
                <Box sx={{ marginLeft: 'auto', display: 'flex', gap: '16px' }}>
                    {user ? (
                        <Button variant="contained" color="error" onClick={handleLogout}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button variant="contained" color="success" component={Link} to='/login'>Login</Button>
                            <Button variant="contained" color="error" component={Link} to='/signup'>Signup</Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;