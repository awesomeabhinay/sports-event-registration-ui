// EventCard.js

import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const EventCard = ({ event, onRegister, onUnregister }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">{event.eventName}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {event.eventCategory}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Start Time: {event.startTime}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    End Time: {event.endTime}
                </Typography>
                {onRegister && (
                    <Button variant="contained" color="primary" onClick={() => onRegister(event)}>
                        Select
                    </Button>
                )}
                {onUnregister && (
                    <Button variant="outlined" color="secondary" onClick={() => onUnregister(event)}>
                        Remove
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default EventCard;
