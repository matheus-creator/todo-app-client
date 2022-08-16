import {
    AppBar,
    Avatar,
    ListItemIcon,
    IconButton,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Tooltip,
    Typography,
    Divider,
    Collapse,
    Alert,
    Button,
    Box,
    Container,
    Fade,
    Backdrop,
    Modal,
    Paper,
    BottomNavigation,
    BottomNavigationAction,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";
import Logout from "@mui/icons-material/Logout";
import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import axios from "../api/axios";
import AddFriend from "./AddFriend";

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    height: 75,
});

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const Navbar = ({ page, setPage }) => {
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
        <AppBar
            position="sticky"
            bgcolor="primary"
            sx={{
                display: { sm: "block", md: "none" },
            }}
        >
            <StyledToolbar>
                <Typography variant="h6" hidden={contributor ? false : true}>TO-DO LIST</Typography>
                <AddFriend sx={{mx: "auto"}} disabled={contributor ? true : false} />
                <Tooltip title="Account settings">
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <Avatar sx={{ width: 40, height: 40 }}>
                            {base64String === "" ? (
                                <EmojiEmotionsIcon
                                    sx={{ width: 40, height: 40 }}
                                />
                            ) : (
                                <img
                                    width="40"
                                    height="40"
                                    src={`data:image/png;base64,${base64String}`}
                                    alt=""
                                />
                            )}
                        </Avatar>
                    </IconButton>
                </Tooltip>
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
            </StyledToolbar>
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
            <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={page === "homepage" ? 0 : 1}
                    onChange={(event, newValue) => {
                        setPage(newValue ? "friendpage": "homepage");
                    }}
                >
                    <BottomNavigationAction
                        label="Homepage"
                        icon={<HomeIcon />}
                    />
                    <BottomNavigationAction
                        disabled={contributor ? false : true}
                        label="Friend page"
                        icon={<ArticleIcon />}
                    />
                </BottomNavigation>
            </Paper>
        </AppBar>
    );
};

export default Navbar;
