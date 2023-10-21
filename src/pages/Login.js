import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const Login = () => {
    const [username, setUsername] = useState('');
    const { user, login } = useUser();
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const currUser = await axios.post(`/login`,
                {
                    username: username
                }
            );
            const currUsername = currUser.data.username;
            console.log("handle User: ", currUsername);

            localStorage.setItem('username', currUsername);
            navigate("/events");
        } catch (e) {
            console.log(e);
            setError(e.response?.data || 'An error occurred during Login.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ marginBottom: '16px' }}
                    />
                    <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                        Login
                    </Button>
                    {error && <Typography color='error' variant="h6" gutterBottom>*{error}</Typography>}
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;