import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core'
// import {useHistory} from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import {useDispatch} from 'react-redux'
import useStyles from './styles'
import {Lock}from '@material-ui/icons'
import Input from './Input'
import Icon from "./icon"
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import {signin, signup} from "../../actions/auth"

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const Navigate = useNavigate();
    // const history = useHistory();
    const handleShowPassword = (e) => {
        setShowPassword(prevShowPassword => !prevShowPassword)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup) {
            dispatch(signup(formData, Navigate))
        } else {
            dispatch(signin(formData, Navigate))
        }
        console.log(formData)
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const switchMode = () => {
        setIsSignup(prevSignup => !prevSignup)
        setShowPassword(false)
    }
    const googleSuccess = async(res) => {
        const result = res?.profileObj;//now won't get error
        const token = res?.tokenId;
        try {
            dispatch({type: 'AUTH', data: {result, token}});
            setTimeout(() => {
                Navigate('/', true);
            }, 1000)
            
        }  catch(error){
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log("Google Sign In was unsuccessful ", error)
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <Lock/>
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"></Input>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}></Input>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"></Input>}
                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'SignUp' : 'Sign in'}
                    </Button>

                    <GoogleLogin
                        clientId ="1057734115779-iivhgedhbns7h3svihu5ch96dkprp7ha.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Dont't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth

