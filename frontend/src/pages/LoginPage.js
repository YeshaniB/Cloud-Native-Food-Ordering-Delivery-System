// src/pages/LoginPage.js

import React from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const LoginPage = () => {
    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                <form>
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;
