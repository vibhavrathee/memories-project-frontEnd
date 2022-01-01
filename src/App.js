import React, {useEffect} from "react";
import {Container} from '@material-ui/core'
import useStyles from './styles'
import Navbar from "./components/Navbar/Navbar";
// import { } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
const App = () => {
    return (
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar/>
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/auth" exact element={<Auth/>}/>
                </Routes>
            </Container>
        </BrowserRouter>
    );
    
}
export default App;