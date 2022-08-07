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

const AddTaskModal = ({ isOpen, setOpen, updateTasks }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(false);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        updateTasks(true);
        setOpen(false);

        await axios
            .post("/tasks", { title, description, completed: status })
            .then((res) => {
                console.log("ok");
            })
            .catch((e) => {
                console.log("error");
            });
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
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
                            width: 400,
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
                            <b>Create new task</b>
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
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={status}
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
                            Create
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AddTaskModal;
