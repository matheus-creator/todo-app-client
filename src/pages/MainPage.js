import React, { useState, useEffect } from "react";
import { Box, Snackbar } from "@mui/material";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import List from "../components/List";

const MainPage = () => {
    const [tasks, setTasks] = useState([]);
    const [updateTasks, setUpdateTasks] = useState(false);
    useEffect(() => {
        const fetchTasks = async () => {
            await axios
                .get("/tasks")
                .then((res) => setTasks(res.data))
                .catch((e) => console.log(e));
        };
        fetchTasks();
    }, [updateTasks]);
    //TODO: Fix creation of tasks
    return (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <Sidebar />
            <List tasks={tasks} setTasks={setTasks} updateTasks={setUpdateTasks}/>
        </Box>
    );
};

export default MainPage;
