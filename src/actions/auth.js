import * as api from '../api/index.js'
import {AUTH} from '../constants/actionTypes'

export const signin = (formData, Navigate) => async(dispatch) => {
    try {
        //log in the user ...
        const {data} = await api.signIn(formData)
        dispatch({type: AUTH, data})
        Navigate('/', true);
    } catch (error) {
        console.log(error)
    }   
} 

export const signup = (formData, Navigate) => async(dispatch) => {
    try {
        //log in the user ...
        const {data} = await api.signUp(formData)
        dispatch({type: AUTH, data})
        Navigate('/', true);
    } catch (error) {
        console.log(error) 
    }
} 
