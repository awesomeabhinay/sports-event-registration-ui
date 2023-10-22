// EventCard.js

import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const EventCard = ({ event, onRegister, onUnregister }) => {

    const formatDate = (dateTime) => {
        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        return new Date(dateTime).toLocaleDateString("en-US", options);
    };

    return (
        <Card variant="outlined" spacing={4}>
            <CardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">{event.eventName}</Typography>
                    {onRegister && event.currentRegistrationCount !== undefined && (
                        <Typography variant="body2" color="textSecondary">
                            Registered: {event.currentRegistrationCount} / {event.maxRegistrationLimit}
                        </Typography>
                    )}
                </div>
                <div className="row">
                    <div className="d-flex">
                        <Typography variant="body2" color="textSecondary">
                            {event.eventCategory}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Start Time: {formatDate(event.startTime)}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            End Time: {formatDate(event.endTime)}
                        </Typography>
                    </div>
                    <div>
                        {onRegister && (
                            <Button variant="contained" color="primary" onClick={() => onRegister(event)}
                                disabled={event.maxRegistrationLimit === event.currentRegistrationCount}>
                                Register
                            </Button>
                        )}
                        {onRegister && event.maxRegistrationLimit === event.currentRegistrationCount && (
                            <Typography variant="body2" color="error">
                                Sorry, this event cannot be registered more. Max limit reached.
                            </Typography>
                        )}
                        {onUnregister && (
                            <Button variant="outlined" color="secondary" onClick={() => onUnregister(event)}>
                                Remove
                            </Button>
                        )}
                    </div>
                </div>

            </CardContent>
        </Card>
    );
};

export default EventCard;
