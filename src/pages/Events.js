import { useEffect, useState } from "react";
import { Container, Grid, Button } from "@mui/material";
import EventCard from "./EventCard";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Events = () => {
    const [eventList, setEventList] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const username = localStorage.getItem('username');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const maxHeight = window.innerHeight - 200;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const registerEvent = async (event) => {
        setLoading(true);
        try {
            await axios.post(`/event/register`, {
                eventId: event.id,
                username: username,
            });
            setLoading(false);

            const updatedEventList = eventList.filter((e) => e.id !== event.id);
            const updatedRegisteredEvents = [...registeredEvents, event];
            setEventList(updatedEventList);
            setRegisteredEvents(updatedRegisteredEvents);
            setSuccessMessage(`Successfully registered for event: ${event.eventName}`);
        } catch (error) {
            setLoading(true)
            await delay(1000);
            console.error("Error registering event:", error.response?.data);
            setError(error.response?.data);
            setLoading(false);
        }
    };

    const unregisterEvent = async (event) => {
        try {
            setLoading(true);
            const response = await axios.delete("/event/unregister", {
                data: {
                    username: username,
                    eventId: event.id,
                },
            });
            await delay(1000);
            setLoading(false);

            const updatedRegisteredEvents = registeredEvents.filter((e) => e.id !== event.id);
            const updatedEventList = [...eventList, event];
            setRegisteredEvents(updatedRegisteredEvents);
            setEventList(updatedEventList);
            setSuccessMessage(`Successfully unregistered for event: ${event.eventName}`);
        } catch (error) {
            console.error("Error unregistering event:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadEventList = async () => {
            try {
                const eventListResponse = await axios.get(`/events/all`);
                const allEvents = eventListResponse.data;

                const username = localStorage.getItem('username')
                const registeredEventsResponse = await axios.get(`/events/${username}`)
                const registeredEvents = registeredEventsResponse.data;

                const unregisteredEvents = allEvents.filter(event => {
                    return !registeredEvents.some(registeredEvent => registeredEvent.id === event.id);
                });
                setEventList(unregisteredEvents);
                setRegisteredEvents(registeredEvents);
            } catch (error) {
                localStorage.removeItem('username');
                navigate('/')
            }

        }
        loadEventList();
    }, []);

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <h2>Event List</h2>
                    <div className="scrollable-container" style={{ maxHeight: `${maxHeight}px` }}>
                        {eventList.map((event) => (
                            <div key={event.id}>
                                <EventCard event={event} onRegister={registerEvent} />
                            </div>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <h2>Registered Events</h2>
                    {registeredEvents.map((event) => (
                        <div key={event.id}>
                            <EventCard event={event} onUnregister={unregisterEvent} />
                        </div>
                    ))}
                </Grid>
            </Grid>
            {loading && (
                <div className="loading-overlay">
                    <CircularProgress />
                </div>
            )}
            {error &&
                <Alert severity="error" onClose={() => { setError(null) }}>{error}</Alert>
            }
            {successMessage &&
                <Alert severity="success" style={{ marginTop: '16px' }} onClose={() => { setSuccessMessage(null) }}>
                    {successMessage}
                </Alert>
            }
        </Container>
    );
}

export default Events;