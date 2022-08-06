import React from "react";
import { Box, Stack } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
axios.defaults.withCredentials = true;

const MainPage = () => {
    return (
        <Box>
            <Navbar />
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Sidebar />
                <Feed />
                <Rightbar />
            </Stack>
        </Box>
    );
};

export default MainPage;
