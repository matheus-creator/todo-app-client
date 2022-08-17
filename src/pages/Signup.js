import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "../api/axios";

const Copyright = (props) =>  {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                To-do App
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorText, setPasswordErrorText] = useState("");
    const [checked, setChecked] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confPassword) {
            setPasswordError(true);
            setPasswordErrorText("The passwords are different");
        } else if (password.length < 6) {
            setPasswordError(true);
            setPasswordErrorText("The password is too short");
        } else {
            const expirationTime = checked ? 'never' : '24h';

            try {
                await axios.post("/users", { name, email, password, expirationTime, contributor: "" });
                navigate("/");
            } catch {
                setEmailError(true);
                setEmailErrorText("Email already in use");
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    onSubmit={(e) => handleSubmit(e)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(false);
                            setEmailErrorText("");
                        }}
                        error={emailError}
                        helperText={emailErrorText}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError(false);
                            setPasswordErrorText("");
                        }}
                        error={passwordError}
                        helperText={passwordErrorText}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        onChange={(e) => {
                            setConfPassword(e.target.value);
                            setPasswordError(false);
                            setPasswordErrorText("");
                        }}
                        error={passwordError}
                        helperText={passwordErrorText}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Confirm password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            inputProps={{ "aria-label": "controlled" }}
                        />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/login" variant="body2">
                                {"Already have an account? Login"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};

export default Signup;
