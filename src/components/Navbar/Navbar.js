import React, {useEffect, useState} from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import useStyles from "./styles"
import {Link, useLocation} from 'react-router-dom'
import memories from '../../images/memories.png'
import memoriesLogo from '../../images/memories-Logo.png'
import memoriesText from '../../images/memories-Text.png'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import { useNavigate } from 'react-router'
const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const Navigate = useNavigate()
    const location = useLocation();
    const handleLogout = () => {
        dispatch({type:'LOGOUT'});
        Navigate('/', true);
        setUser(null);
    }
    console.log(user);
    useEffect(() => {
        const token = user?.token;
        //JWT...
        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp*1000 < new Date().getTime()){
                handleLogout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    return (
        <div>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Link to="/" className={classes.brandContainer}>
                    {/* <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography> */}
                    <img className={classes.image} src = {memoriesText} alt="memories" height="45px"/>
                    <img className={classes.image} src = {memoriesLogo} alt="memories" height="40px"/>
                </Link>
                <Toolbar className = {classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                ):(
                    <Button variant="contained" color="primary" onClick={() => Navigate("/auth")}>Sign in</Button>
                )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
