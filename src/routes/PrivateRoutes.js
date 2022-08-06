import { Navigate, Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../api/axios";

export const PrivateRoutes = () => {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            await axios
                .get("/users/me")
                .then((res) => {
                    setAuthenticated(true);
                })
                .catch((e) => {
                    setAuthenticated(false);
                });
            setLoading(false);
        };
        initializeAuth();
    }, []);

    return isLoading ? (
        <div>hey</div>
    ) : isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoutes;
