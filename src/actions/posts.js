import * as api from '../api/index.js'
import {FETCH_BY_SEARCH, FETCH_POST,FETCH_ALL,START_LOADING, END_LOADING, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes'

export const getPost = (id) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.fetchPost(id);
        console.log(data);
        dispatch({type: FETCH_POST, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error.message);
    }
}

export const getPosts = (page) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        // console.log("Frontend getPost called ", page);
        const {data} = await api.fetchPosts(page);
        console.log(data);
        dispatch({type: FETCH_ALL, payload: data})
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        //we have put it in a new object with data propert
        const {data} = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data})
        console.log(data);
        dispatch({type: END_LOADING})
    } catch(e) {
        console.log(e);
    }
}

export const createPost = (post, navigate) => async(dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.createPost(post);//this createPost is different
        dispatch({type: CREATE, payload: data});
        dispatch({type: END_LOADING})
        navigate(`/posts/${data._id}`);
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