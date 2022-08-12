import React, { useState } from "react";
import axios from "../api/axios";
import {
    Backdrop,
    Box,
    Button,
    Fade,
    FormControl,
    FormControlLabel,
    Modal,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";

// TODO: fix modal problems

const TaskModal = ({ data, isOpen, setOpen, tasks, setTasks, type }) => {
    console.log(tasks)
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.description);
    const [status, setStatus] = useState(data.completed);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        setOpen(false);
        const task = { title, description, completed: status };

        if (type === "create") {
            await axios
                .post("/tasks", task)
                .then((res) => {
                    setTasks([
                        ...tasks,
                        {
                            task_uid: res.data.task_uid,
                            ...task,
                            user_uid: res.data.user_uid,
                        },
                    ]);
                })
                .catch((e) => {
                    window.location.href = "/login";
                });
        } else {
            const id = data.task_uid;
            const tasksCopy = tasks;
            const index = tasksCopy.findIndex(task => task.task_uid === id);
            tasksCopy[index].title = title;
            tasksCopy[index].description = description;
            tasksCopy[index].completed = status;

            await axios
                .patch(`/tasks/${id}`, task)
                .then((res) => {
                    setTasks(tasksCopy);
                })
                .catch((e) => {
                    window.location.href = "/login";
                });
        }
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        minWidth: 300
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isOpen}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isOpen}>
                <Box sx={style}>
                    <Box
                        component="form"
                        sx={{
                            mx: "auto",
                            py: 3,
                            px: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={(e) => onFormSubmit(e)}
                    >
                        <Typography variant="h4">
                            <b>
                                {type === "create"
                                    ? "Create new task"
                                    : "Update task"}
                            </b>
                        </Typography>

                        <TextField
                            id="outlined-search"
                            label="Title"
                            type="search"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={3}
                            label="Description"
                            type="search"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                value={status}
                                defaultValue={data.completed}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <FormControlLabel
                                    value={true}
                                    control={<Radio />}
                                    label="Complete"
                                />
                                <FormControlLabel
                                    value={false}
                                    control={<Radio />}
                                    label="Incomplete"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Button
                            size="large"
                            variant="contained"
                            onClick={(e) => onFormSubmit(e)}
                        >
                            {type}
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default TaskModal;
