import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState } from "react";

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});

const Icons = styled(Box)({
    gap: "20px",
    alignItems: "center",
});

// TODO: use useRef to manage current user and have his name, avatar, ... available in all components

const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <AppBar
            position="sticky"
            bgcolor="primary"
            sx={{
                display: { sm: "block", md: "none" },
            }}
        >
            <StyledToolbar>
                <Typography variant="h6">TODO LIST</Typography>
                <Icons sx={{ display: "flex", mx: 4 }}>
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                    <Badge badgeContent={2} color="error">
                        <NotificationsIcon />
                    </Badge>
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        alt="Travis Howard"
                        src="https://mui.com/static/images/avatar/2.jpg"
                        onClick={() => setOpen(true)}
                    />
                </Icons>
            </StyledToolbar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
            </Menu>
        </AppBar>
    );
};

export default Navbar;
