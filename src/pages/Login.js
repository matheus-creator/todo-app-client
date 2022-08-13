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

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                TodoList
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [checked, setChecked] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expirationTime = checked ? 'never' : '24h';

        await axios
            .post("/users/login", { email, password, expirationTime })
            .then((res) => {
                navigate("/");
            })
            .catch((e) => {
                setError(true);
                setErrorText("Credentials invalid");
            });
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
                <Avatar sx={{ m: 1, bgcolor: "alternative.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box
                    component="form"
                    onSubmit={(e) => handleSubmit(e)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(false);
                            setErrorText("");
                        }}
                        error={error}
                        helperText={errorText}
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        type="email"
                        label="Email Address"
                        autoFocus
                    />
                    <TextField
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(false);
                            setErrorText("");
                        }}
                        error={error}
                        helperText={errorText}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};

export default Login;
