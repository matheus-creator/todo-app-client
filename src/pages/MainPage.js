import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import Sidebar from "../components/Sidebar";
import List from "../components/List";
import Navbar from "../components/Navbar";

const MainPage = () => {
    const [page, setPage] = useState("homepage");
    
    return (
        <Box sx={{minHeight: "100vh", backgroundColor: "#bbbdbd"}}>
            <Navbar />
            <Stack direction="row">
                <Sidebar setPage={setPage} />
                <List page={page} />
            </Stack>
        </Box>
    );
};

export default MainPage;
