import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    useEffect(() => {
        if (username) {
            navigate("/");
        } else {
            navigate("/login");
        }
    }, []);

}

export default NotFound;