import React from "react";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    Tooltip,
    IconButton,
    Modal,
    Container,
    Fade,
    Backdrop,
    Typography,
    Button,
    Alert,
    Collapse,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CloseIcon from "@mui/icons-material/Close";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Logout from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Buffer } from "buffer";
import AddFriend from "./AddFriend";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

// TODO: add friend only if he doesnt have another contributor

const Sidebar = ({ setPage }) => {
    const [contributor, setContributor] = useState(null);
    const [error, setError] = useState(false);
    const [uploadErrorMessage, setUploadErrorMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [base64String, setBase64String] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const handleClose = () => {
        setModalOpen(false);
        setError(false);
        setUploadErrorMessage("");
    };

    const logoutUser = async () => {
        await axios.post("/users/logout");
        window.location.href = "/login";
    };

    const deleteUser = async () => {
        await axios.delete("/users/me").then((res) => {
            window.location.href = "/login";
        });
    };

    const removeContributor = async () => {
        await axios
            .delete("/users/me/contributor")
            .then((res) => {
                setContributor(null);
                setPage("homepage");
            })
            .catch((e) => {
                window.location.href = "/login";
            });
    };

    const deleteAvatar = async () => {
        await axios
            .delete("/users/me/avatar")
            .then((res) => {
                setBase64String("");
            })
            .catch((e) => {
                window.location.href = "/login";
            });
    };

    const uploadAvatar = async (e) => {
        let formData = new FormData();
        formData.append("avatar", e.target.files[0]);
        await axios
            .post("/users/me/avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setModalOpen(false);
                const string = Buffer.from(
                    res.data.rows[0].buffer.data
                ).toString("base64");
                setBase64String(string);
            })
            .catch((err) => {
                if (err.response.data.error === "File too large") {
                    setUploadErrorMessage(
                        `${err.response.data.error} (max 1 MB)`
                    );
                } else {
                    setUploadErrorMessage(err.response.data.error);
                }
                setError(true);
                e.target.files[0] = {};
            });
    };

    useEffect(() => {
        const getContributor = async () => {
            await axios
                .get("/users/me/contributor")
                .then((res) => {
                    setContributor(res.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        const getAvatar = async () => {
            await axios.get("/users/me/avatar").then((res) => {
                const string = Buffer.from(res.data.buffer.data).toString(
                    "base64"
                );
                setBase64String(string);
            });
        };

        getContributor();
        getAvatar();
    }, []);

    return (
        <Box
            color="#f2eeed"
            sx={{
                display: { xs: "none", sm: "none", md: "block" },
                height: "100vh",
                width: 350,
            }}
        >
            <Box
                position="fixed"
                bgcolor="#323635"
                sx={{ width: 350, height: "100vh" }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        my: 5,
                    }}
                >
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                            <Avatar sx={{ width: 100, height: 100 }}>
                                {base64String === "" ? (
                                    <EmojiEmotionsIcon
                                        sx={{ width: 75, height: 75 }}
                                    />
                                ) : (
                                    <img
                                        src={`data:image/png;base64,${base64String}`}
                                        alt=""
                                    />
                                )}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={() => setAnchorEl(null)}
                    onClick={() => setAnchorEl(null)}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&:before": {
                                display: "block",
                                position: "absolute",
                                top: 0,
                                left: 56,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{
                        horizontal: "center",
                        vertical: "top",
                    }}
                    anchorOrigin={{
                        horizontal: "right",
                        vertical: "bottom",
                    }}
                >
                    <MenuItem onClick={() => setModalOpen(true)}>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        Upload profile picture
                    </MenuItem>
                    <MenuItem
                        onClick={deleteAvatar}
                        disabled={base64String === "" ? true : false}
                    >
                        <ListItemIcon>
                            <RemoveCircleIcon fontSize="small" />
                        </ListItemIcon>
                        Remove profile picture
                    </MenuItem>
                    <MenuItem
                        onClick={removeContributor}
                        disabled={contributor ? false : true}
                    >
                        <ListItemIcon>
                            <PersonRemoveIcon fontSize="small" />
                        </ListItemIcon>
                        Remove contributor
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={logoutUser}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                    <MenuItem onClick={deleteUser}>
                        <ListItemIcon>
                            <DeleteForeverIcon fontSize="small" />
                        </ListItemIcon>
                        Delete account
                    </MenuItem>
                </Menu>
                <Box sx={{ mx: 5 }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                component="a"
                                onClick={() => setPage("homepage")}
                            >
                                <ListItemIcon>
                                    <HomeIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText primary="Homepage" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                component="a"
                                disabled={contributor ? false : true}
                                onClick={() => setPage("friendpage")}
                            >
                                <ListItemIcon>
                                    <ArticleIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        contributor
                                            ? `${contributor.name} page`
                                            : "Friend page"
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "10%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <AddFriend disabled={contributor ? true : false} />
                </Box>
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                sx={{ mx: 4 }}
            >
                <Fade in={modalOpen}>
                    <Container maxWidth="xs" sx={style}>
                        <Box
                            sx={{
                                py: 2,
                                px: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <Typography
                                variant="h5"
                                fontWeight="500"
                                sx={{ mb: 4 }}
                            >
                                Upload your avatar
                            </Typography>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ width: "70%", mt: 2 }}
                            >
                                Choose file
                                <input
                                    hidden
                                    type="file"
                                    name="avatar"
                                    onChange={uploadAvatar}
                                />
                            </Button>
                            <Collapse in={error}>
                                <Alert
                                    sx={{ mt: 4 }}
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={() => {
                                                setError(false);
                                            }}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                >
                                    {uploadErrorMessage}
                                </Alert>
                            </Collapse>
                        </Box>
                    </Container>
                </Fade>
            </Modal>
        </Box>
    );
};

export default Sidebar;
