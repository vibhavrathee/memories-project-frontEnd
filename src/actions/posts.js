import * as api from '../api/index.js'
import {FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes'
export const getPosts = () => async(dispatch) => {
    try {
        const {data} = await api.fetchPosts();
        console.log(data);
        dispatch({type: FETCH_ALL, payload: data})
    } catch (error) {
        console.log(error.message);
    }
}
export const createPost = (post) => async(dispatch) => {
    try {
        const {data} = await api.createPost(post);//this createPost is different
        dispatch({type: CREATE, payload: data});
    } catch(error) {
        console.log(error);
    }
}

export const updatePost = (post, id) => async(dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);//whatever that is send by res.json() in server side
        console.log("updatePost just called dispatch");
        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: DELETE, payload: id});
    } catch(error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const {data} = await api.likePost(id);
        dispatch({type: LIKE, payload: data});
    } catch (error) {
        console.log(error);
    }
}