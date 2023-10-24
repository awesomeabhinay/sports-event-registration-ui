import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Alert } from '@mui/material';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignup = async () => {
        try {
            setError(null);
            setSuccessMessage(null);
            const newUser = await axios.post(
                '/create/user',
                {
                    username: username,
                    email: email,
                }
            );
            setSuccessMessage(`Signup successful for user: ${username}`);
        } catch (e) {
            setError(e.response?.data || 'An error occurred during signup.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Signup
                    </Typography>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ marginBottom: '16px' }}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: '16px' }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSignup} fullWidth>
                        Signup
                    </Button>
                    {error &&
                        <Typography color="error" variant="h6" gutterBottom>
                            *{error}
                        </Typography>}
                    {successMessage &&
                        <Alert severity="success" style={{ marginTop: '16px' }}>
                            <p>{successMessage} Please <Link to="/login">log in</Link></p>
                        </Alert>
                    }
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;
