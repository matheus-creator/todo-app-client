import React, { useState } from "react";
import axios from "../api/axios";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import { TextField, Typography, Button, Link, Box } from "@mui/joy";
import { useNavigate } from "react-router-dom";

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

    const registerUser = async () => {
        if (password !== confPassword) {
            setPasswordError(true);
            setPasswordErrorText("The passwords are different");
        } else if (password.length < 6) {
            setPasswordError(true);
            setPasswordErrorText("The password is too short");
        } else {
            await axios
                .post("/users", { name, email, password })
                .then((res) => {
                    navigate("/");
                })
                .catch((e) => {
                    setEmailError(true);
                    setEmailErrorText("Email already in use");
                });
        }
    };

    return (
        <CssVarsProvider>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        width: 400,
                        mx: "auto",
                        my: 4,
                        py: 3,
                        px: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        borderRadius: "sm",
                        boxShadow: "sm",
                    }}
                >
                    <div>
                        <Typography level="h4" component="h1">
                            <b>Welcome!</b>
                        </Typography>
                        <Typography level="body2">
                            Sign up to continue
                        </Typography>
                    </div>
                    <TextField
                        onChange={(e) => setName(e.target.value)}
                        name="name"
                        type="name"
                        placeholder="Type here your name"
                        label="Name"
                    />
                    <TextField
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(false);
                            setEmailErrorText("");
                        }}
                        error={emailError}
                        helperText={emailErrorText}
                        name="email"
                        type="email"
                        placeholder="Type here your email"
                        label="Email"
                    />
                    <TextField
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError(false);
                            setPasswordErrorText("");
                        }}
                        error={passwordError}
                        helperText={passwordErrorText}
                        name="password"
                        type="password"
                        placeholder="Type here your password"
                        label="Password"
                    />
                    <TextField
                        onChange={(e) => {
                            setConfPassword(e.target.value);
                            setPasswordError(false);
                            setPasswordErrorText("");
                        }}
                        error={passwordError}
                        helperText={passwordErrorText}
                        name="password"
                        type="password"
                        placeholder="Type your password again"
                        label="Confirm password"
                    />
                    <Button
                        onClick={() => registerUser()}
                        sx={{
                            mt: 1,
                        }}
                    >
                        Sign up
                    </Button>
                    <Typography
                        endDecorator={<Link href="/login">Log in</Link>}
                        fontSize="sm"
                        sx={{ alignSelf: "center" }}
                    >
                        Already have an account?
                    </Typography>
                </Sheet>
            </Box>
        </CssVarsProvider>
    );
};

export default Signup;
