import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import axios from "../api/axios";

const AddFriend = ({ disabled }) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");

    const handleAdd = async () => {
        await axios
            .patch("/users/me/contributor", {
                contributor_email: email,
            })
            .then((res) => {
                window.location.href = "/";
            })
            .catch((e) => {
                window.location.href = "/login";
            });
        setOpen(false);
    };

    return (
        <Box
            sx={{
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <Button
                variant="contained"
                color="alternative"
                onClick={() => setOpen(true)}
                sx={{display: disabled ? "none" : "block"}}
            >
                Add a friend
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                sx={{ minWidth: 200 }}
            >
                <DialogTitle>Add a friend</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a friend to contribute to your to-do list. You can
                        also edit his.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Contributor Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AddFriend;
