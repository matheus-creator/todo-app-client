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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { deepOrange } from "@mui/material/colors";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Buffer } from "buffer";

// TODO: fix image of profile

const Sidebar = () => {
    const [user, setUser] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [base64String, setBase64String] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const menuOpen = Boolean(anchorEl);

    const logoutUser = async () => {
        await axios.post("/users/logout");
        window.location.href = "/login";
    };

    const deleteUser = async () => {
        await axios
            .delete("/users/me")
            .then((res) => {
                window.location.href = "/login";
            });
    };

    const uploadAvatar = async (e) => {
        console.log("hey");
        // setSelectedFile(e.target.files[0]);
        // let formData = new FormData();
        // formData.append("image", selectedFile);
        // await axios
        //     .post("/users/me/avatar", formData, {
        //         headers: {
        //             "Content-Type": "image/png",
        //         },
        //     })
        //     .then((res) => {
        //         console.log(res);
        //         // const string = Buffer.from(res.data.buffer.data).toString(
        //         //     "base64"
        //         // );
        //         // setBase64String(string);
        //     })
        //     .catch((e) => console.log(e));
    };

    useEffect(() => {
        const getUser = async () => {
            await axios
                .get("/users/me")
                .then((res) => {
                    setUser({ name: res.data.name, id: res.data.user_uid});
                })
                .catch((e) => console.log(e));
        }

        const getAvatar = async () => {
            await axios
                .get("/users/me/avatar")
                .then((res) => {
                    const string = Buffer.from(res.data.buffer.data).toString(
                        "base64"
                    );
                    setBase64String(string);
                })
                .catch((e) => console.log(e));
        };

        getUser();
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
                <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
                    <Avatar
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        sx={{
                            bgcolor: deepOrange[500],
                            width: 100,
                            height: 100,
                        }}
                    >
                        { base64String === "" ? (<EmojiEmotionsIcon sx={{ width: 50, height: 50 }} />) : (<img
                            src={`data:image/png;base64,${base64String}`}
                            alt=""
                        />) }
                        <img
                            src={`data:image/png;base64,${base64String}`}
                            alt=""
                        />
                    </Avatar>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
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
                                content: '""',
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
                    <MenuItem component="label">
                        <input
                            id="upload-picture"
                            hidden
                            type="file"
                            onChange={(e) => uploadAvatar(e)}
                        />
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        Upload profile picture
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add contributor
                    </MenuItem>
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
                            <ListItemButton component="a" href="#">
                                <ListItemIcon>
                                    <HomeIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText primary="Homepage" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component="a" href="#">
                                <ListItemIcon>
                                    <ArticleIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText primary="Friend page" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
