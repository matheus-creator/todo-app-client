import {
    AppBar,
    Avatar,
    Badge,
    Box,
    InputBase,
    Menu,
    MenuItem,
    styled,
    Toolbar,
    Typography,
} from "@mui/material";
import Flame from "@mui/icons-material/LocalFireDepartment";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState } from "react";

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});

const Search = styled("div")({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: "5px",
    width: "40%",
});

const Icons = styled(Box)({
    gap: "20px",
    alignItems: "center",
});

const UserBox = styled(Box)({
    gap: "10px",
    alignItems: "center",
});

const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <AppBar position="sticky">
            <StyledToolbar>
                <Typography
                    variant="h6"
                    sx={{
                        display: { xs: "none", sm: "block" },
                    }}
                >
                    MRFLAMES
                </Typography>
                <Flame
                    sx={{
                        display: { xs: "block", sm: "none" },
                    }}
                />
                <Search>
                    <InputBase placeholder="search..." />
                </Search>
                <Icons sx={{ display: { xs: "none", sm: "flex" } }}>
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
                <UserBox
                    sx={{ display: { xs: "flex", sm: "none" } }}
                    onClick={() => setOpen(true)}
                >
                    <Avatar
                        sx={{ width: 30, height: 30 }}
                        alt="Travis Howard"
                        src="https://mui.com/static/images/avatar/2.jpg"
                    />
                    <Typography variant="span">John</Typography>
                </UserBox>
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
