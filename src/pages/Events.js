import { useEffect, useState } from "react";
import { Container, Grid, Button } from "@mui/material";
import EventCard from "../components/EventCard";
import axios from "axios";
import useUser from "../hooks/useUser";
import { Alert } from "@mui/material";

const Events = () => {
    const { user } = useUser();
    const [eventList, setEventList] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const username = localStorage.getItem('username');
    const [error, setError] = useState(null);

    const maxHeight = window.innerHeight - 200;
    // Function to register an event by making a backend API call
    const registerEvent = async (event) => {
        try {
            // Make the API call to register the event
            await axios.post(`/event/register`, {
                eventId: event.id,
                username: username,
            });

            // Update the local state
            const updatedEventList = eventList.filter((e) => e.id !== event.id);
            const updatedRegisteredEvents = [...registeredEvents, event];
            setEventList(updatedEventList);
            setRegisteredEvents(updatedRegisteredEvents);
        } catch (error) {
            console.error("Error registering event:", error);
            setError(error);
        }
    };

    // Function to unregister an event by making a backend API call
    const unregisterEvent = async (event) => {
        try {
            // Make the API call to unregister the event
            console.log(event.id);
            const response = await axios.delete("/event/unregister", {
                data: {
                    username: username,
                    eventId: event.id,
                },
            });

            // Update the local state
            const updatedRegisteredEvents = registeredEvents.filter((e) => e.id !== event.id);
            const updatedEventList = [...eventList, event];
            setRegisteredEvents(updatedRegisteredEvents);
            setEventList(updatedEventList);
        } catch (error) {
            console.error("Error unregistering event:", error);
        }
    };

    useEffect(() => {
        const loadEventList = async () => {
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
            {error &&
                <Alert severity="error" onClose={() => { setError(null) }}>This is a error alert</Alert>
            }
        </Container>
    );
}

export default Events;