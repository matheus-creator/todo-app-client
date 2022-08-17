import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "../api/axios";

const AddFriend = ({ disabled }) => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const handleAdd = async () => {
        try {
            await axios.patch("/users/me/contributor", { contributor_email: email });
            window.location.href = "/";
            setOpen(false);
        } catch (e) {
            if (e.response.status === 401) {
                window.location = "/login";
            }
            setError(true);
            setErrorText(e.response.data.error);
        }        
    };

    return (
        <>
            <Button
                variant="contained"
                color="alternative"
                onClick={() => setOpen(true)}
                sx={{ display: disabled ? "none" : "block" }}
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
                        error={error}
                        helperText={errorText}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(false);
                            setErrorText("");
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddFriend;
