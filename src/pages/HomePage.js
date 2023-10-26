import React from "react";
import { Link } from "react-router-dom";
import { Grid, Container, Box } from "@mui/material";

const HomePage = () => {
    const username = localStorage.getItem('username');

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            minHeight="100vh"
            textAlign="center" 
        >
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {username ? (
                            <>
                                <h2>Hi {username}</h2>
                                <p>
                                    <Link to="/events">Go to Events Page</Link>
                                </p>
                            </>
                        ) : (
                            <p>Please <Link to="/login">log in</Link> to access the events page.</p>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default HomePage;
