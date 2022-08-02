import React from 'react';
import MainPage from './MainPage';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <div className="app">                    
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<MainPage />}/>
                    <Route path='/login' exact element={<Login />}/>
                    <Route path='/signup' exact element={<Signup />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;