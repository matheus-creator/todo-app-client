import React from 'react';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';

const App = () => {
    return (
        <div className="app">                    
            <BrowserRouter>
                <Routes>
                    <Route exact element={<PrivateRoutes/>}>
                        <Route path='/' exact element={<MainPage/>}/>
                    </Route>
                    <Route path='/login' exact element={<Login />}/>
                    <Route path='/signup' exact element={<Signup />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;