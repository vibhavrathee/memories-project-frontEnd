import React, {useEffect} from "react";
import {Container} from '@material-ui/core'
import useStyles from './styles'
import Navbar from "./components/Navbar/Navbar";
// import { } from "react-router";
import { BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import { useNavigate } from "react-router";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
const App = () => {
    // const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'))
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/posts"/>}/>
                    <Route path="/posts" exact element={<Home/>}/>
                    <Route path="/posts/search" exact element={<Home/>}/>
                    <Route path="/posts/:id" element={<PostDetails/>}/>
                    {/* redirect to /posts incase alreadu authenticated */}
                    <Route path="/auth" exact element={(!user ? <Auth/> : <Navigate replace to="/posts"/>)}/>
                </Routes>
            </Container>
        </BrowserRouter>
    );
    
}
export default App;