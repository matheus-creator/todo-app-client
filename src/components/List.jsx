import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    Fab,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";
import TaskModal from "./TaskModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "../api/axios";

const List = ({ page }) => {
    const url = page === "homepage" ? "tasks" : "contributorTasks";

    const [tasks, setTasks] = useState([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [modalTask, setModalTask] = useState({
        title: "",
        description: "",
        completed: false,
        task_uid: "",
    });

    useEffect(() => {
        const fetchTasks = async () => {
            await axios
                .get(url)
                .then((res) => {
                    setTasks(res.data);
                })
                .catch((e) => {
                    window.location.href = "/login";
                });
        };
        fetchTasks();
    }, [url]);

    const CustomAccordion = ({
        task_uid,
        title,
        description,
        status,
        updateStatus,
    }) => {
        const [expanded, setExpanded] = useState(false);
        const [completed, setCompleted] = useState(status);

        return (
            <Accordion
                expanded={expanded}
                onChange={() => {
                    setExpanded(!expanded);
                }}
            >
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ backgroundColor: "#dddddd" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Checkbox
                                checked={completed}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCompleted(!completed);
                                    updateStatus(task_uid, !completed);
                                }}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<CheckCircleIcon />}
                            />
                            <Typography fontWeight="700">{title}</Typography>
                        </Box>
                        <Box>
                            <Tooltip
                                title="Delete"
                                onClick={() => deleteTask(task_uid)}
                            >
                                <IconButton>
                                    <DeleteIcon sx={{ color: "red" }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip
                                title="Edit"
                                onClick={() => handleTaskEdit(task_uid)}
                            >
                                <IconButton>
                                    <EditIcon sx={{ color: "#32a842" }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: "#f0f0f0", p: 2 }}>
                    <Typography>{description}</Typography>
                </AccordionDetails>
            </Accordion>
        );
    };

    const deleteTask = async (id) => {
        await axios
            .delete(`/${url}/${id}`)
            .then((res) => {
                const newTasks = tasks.filter((task) => task.task_uid !== id);
                setTasks(newTasks);
            })
            .catch((e) => {
                window.location.href = "/login";
            });
    };

    const handleTaskEdit = (id) => {
        const task = tasks.filter((task) => task.task_uid === id)[0];
        setModalTask(task);
        setUpdateModalOpen(true);
    };

    const updateStatus = async (id, status) => {
        const data = { completed: status };
        const tasksCopy = tasks;
        const index = tasksCopy.findIndex((task) => task.task_uid === id);
        tasksCopy[index].completed = status;
        setTasks(tasksCopy);

        await axios.patch(`/tasks/${id}`, data).catch((e) => {
            window.location.href = "/login";
        });
    };

    const renderTasks = () => {
        return tasks.map((task) => {
            return (
                <CustomAccordion
                    key={task.task_uid}
                    task_uid={task.task_uid}
                    title={task.title}
                    description={task.description}
                    status={task.completed}
                    updateStatus={updateStatus}
                />
            );
        });
    };

    return (
        <Box p={4} sx={{ mx: "auto", width: 500 }}>
            <Box
                flex={3}
                sx={{ display: "flex", flexDirection: "column", my: 8 }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: {
                            xs: "center",
                            sm: "center",
                            md: "space-between",
                        },
                        alignItems: "center",
                        maxWidth: 500,
                    }}
                >
                    <Typography variant="h3" fontWeight="700" color="primary">
                        To-do list
                    </Typography>

                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                        onClick={() => setCreateModalOpen(true)}
                    >
                        <AddIcon />
                    </Fab>

                    <TaskModal
                        url={url}
                        data={{
                            title: "",
                            description: "",
                            completed: false,
                        }}
                        tasks={tasks}
                        setTasks={setTasks}
                        isOpen={createModalOpen}
                        setOpen={setCreateModalOpen}
                        type={"create"}
                    />

                    <TaskModal
                        url={url}
                        data={{
                            title: modalTask.title,
                            description: modalTask.description,
                            completed: modalTask.completed,
                            task_uid: modalTask.task_uid,
                        }}
                        tasks={tasks}
                        setTasks={setTasks}
                        isOpen={updateModalOpen}
                        setOpen={setUpdateModalOpen}
                        type={"update"}
                    />
                </Box>
                <Box sx={{ my: 5, maxWidth: 500 }}>{renderTasks()}</Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{
                            display: { sm: "flex", md: "none" },
                            position: "fixed",
                            top: "85%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <AddIcon onClick={() => setCreateModalOpen(true)} />
                    </Fab>
                </Box>
            </Box>
        </Box>
    );
};

export default List;
