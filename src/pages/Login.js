import React, { useState } from "react";
import axios from "../api/axios";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import { TextField, Typography, Button, Link, Box } from "@mui/joy";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const checkCredentials = async () => {
        await axios
            .post("/users/login", { email, password })
            .then((res) => {
                navigate("/");
            })
            .catch((e) => {
                setError(true);
                setErrorText("Credentials invalid");
            });
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
                            Sign in to continue
                        </Typography>
                    </div>
                    <TextField
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(false);
                            setErrorText("");
                        }}
                        error={error}
                        name="email"
                        type="email"
                        placeholder="Type here your email"
                        label="Email"
                        helperText={errorText}
                        autoComplete="on"
                    />
                    <TextField
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(false);
                            setErrorText("");
                        }}
                        error={error}
                        name="password"
                        type="password"
                        placeholder="Type here your password"
                        label="Password"
                        helperText={errorText}
                    />
                    <Button
                        onClick={() => checkCredentials()}
                        sx={{
                            mt: 1,
                        }}
                    >
                        Log in
                    </Button>
                    <Typography
                        endDecorator={<Link href="/signup">Sign up</Link>}
                        fontSize="sm"
                        sx={{ alignSelf: "center" }}
                    >
                        Don't have an account?
                    </Typography>
                </Sheet>
            </Box>
        </CssVarsProvider>
    );
};

export default Login;
