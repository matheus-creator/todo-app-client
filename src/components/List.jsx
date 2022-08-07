import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    Fab,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useState } from "react";
import AddTaskModal from "./AddTaskModal";

const List = ({ tasks, setTasks, updateTasks }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const CustomAccordion = ({ title, description, status }) => {
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
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Checkbox
                            checked={completed}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCompleted(!completed);
                            }}
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                        />
                        <Typography>{title}</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{description}</Typography>
                </AccordionDetails>
            </Accordion>
        );
    };

    const renderTasks = () => {
        return tasks.map((task) => {
            return (
                <CustomAccordion
                    title={task.title}
                    description={task.description}
                    status={task.completed}
                />
            );
        });
    };

    return (
        <Box
            flex={3}
            sx={{ display: "flex", flexDirection: "column", mx: 40, my: 20 }}
        >
            <Box
                sx={{
                    maxWidth: 500,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h2" fontWeight="400">
                    Todo list
                </Typography>
                <Fab color="primary" aria-label="add">
                    <AddBoxIcon onClick={() => setModalOpen(true)}/>
                </Fab>
                <AddTaskModal setTasks={setTasks} isOpen={modalOpen} setOpen={setModalOpen} updateTasks={updateTasks}/>
            </Box>
            <Box sx={{ width: 500, my: 5 }}>{renderTasks()}</Box>
        </Box>
    );
};

export default List;
