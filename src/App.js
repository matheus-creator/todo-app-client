import React from "react";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import mainTheme from "./themes/main";
import { ThemeProvider } from "@emotion/react";

const App = () => {
    return (
        <div className="app">
            <ThemeProvider theme={mainTheme}>
                <BrowserRouter>
                    <Routes>
                        <Route exact element={<PrivateRoutes />}>
                            <Route path="/" exact element={<MainPage />} />
                            <Route path="/*" exact element={<Navigate to="/" />}
                            />
                        </Route>
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/signup" exact element={<Signup />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
