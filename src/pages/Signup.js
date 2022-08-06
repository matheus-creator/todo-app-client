import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import { TextField, Typography, Button, Link, Box } from "@mui/joy";

const Signup = () => {

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
                        name="name"
                        type="name"
                        placeholder="Type here your name"
                        label="Name"
                    />
                    <TextField
                        name="email"
                        type="email"
                        placeholder="Type here your email"
                        label="Email"
                    />
                    <TextField
                        error={true}
                        helperText="Incorrect"
                        name="password"
                        type="password"
                        placeholder="Type here your password"
                        label="Password"
                    />
                    <Button
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
