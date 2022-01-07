import {FETCH_ALL, COMMENT, CREATE, FETCH_POST, START_LOADING, END_LOADING, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH} from '../constants/actionTypes'

export default (state={isLoading: true, posts: []}, action) => {
    switch(action.type) {
        case START_LOADING: 
            return {...state, isLoading: true}
        case END_LOADING:
            return {...state, isLoading: false}
        case FETCH_BY_SEARCH:
            return  {...state, posts: action.payload.data}
        case FETCH_POST:
            return  {...state, post: action.payload}
        case DELETE:
            return {...state, posts: state.posts.filter((post) => action.payload !== post._id)}
        case UPDATE:
        case LIKE:
            return {...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)}
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    // return all the other posts
                    // change the post that just received a comment
                    if(post._id === action.payload._id) {
                        return action.payload;
                    }
                    return post;
                })
            }
        case FETCH_ALL:
            return {
                ...state, 
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case CREATE:
            return {...state, posts: [...state.posts, action.payload]};
        default :
            return state;
    }
}