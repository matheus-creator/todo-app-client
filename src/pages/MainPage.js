import React from "react";
import { Box, Stack } from "@mui/material";
import Sidebar from "../components/Sidebar";
import List from "../components/List";
import Navbar from "../components/Navbar";

const MainPage = () => {
    return (
        <Box sx={{minHeight: "100vh", backgroundColor: "#bbbdbd"}}>
            <Navbar />
            <Stack direction="row">
                <Sidebar />
                <List />
            </Stack>
        </Box>
    );
};

export default MainPage;
