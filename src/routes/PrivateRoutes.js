import { Navigate, Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Backdrop, CircularProgress } from "@mui/material";

const PrivateRoutes = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await axios.get("/users/me");
                setAuthenticated(true);
            } catch {
                setAuthenticated(false);
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    return isLoading ? (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    ) : isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoutes;
