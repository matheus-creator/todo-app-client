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
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useState, useEffect } from "react";
import TaskModal from "./TaskModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "../api/axios";

const List = () => {
    const [tasks, setTasks] = useState([]);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [modalTask, setModalTask] = useState({});

    useEffect(() => {
        const fetchTasks = async () => {
            await axios
                .get("/tasks")
                .then((res) => {
                    setTasks(res.data);
                })
                .catch((e) => {
                    window.location.href = "/login";
                });
        };
        fetchTasks();
    }, []);

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
                                icon={<CheckBoxOutlineBlankIcon />}
                                checkedIcon={<CheckBoxIcon />}
                            />
                            <Typography>{title}</Typography>
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
                <AccordionDetails>
                    <Typography>{description}</Typography>
                </AccordionDetails>
            </Accordion>
        );
    };

    const deleteTask = async (id) => {
        await axios
            .delete(`/tasks/${id}`)
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

        await axios
            .patch(`/tasks/${id}`, data)
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
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
                    <Typography variant="h3" fontWeight="700">
                        Todo list
                    </Typography>

                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                    >
                        <AddBoxIcon onClick={() => setCreateModalOpen(true)} />
                    </Fab>

                    <TaskModal
                        data={{ title: "", description: "", completed: false }}
                        tasks={tasks}
                        setTasks={setTasks}
                        isOpen={createModalOpen}
                        setOpen={setCreateModalOpen}
                        type={"create"}
                    />
                    <TaskModal
                        data={{
                            title: modalTask.title,
                            description: modalTask.description,
                            completed: modalTask.completed,
                            task_uid: modalTask.task_uid
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
                        sx={{ display: { sm: "flex", md: "none" } }}
                    >
                        <AddBoxIcon onClick={() => setCreateModalOpen(true)} />
                    </Fab>
                </Box>
            </Box>
        </Box>
    );
};

export default List;
