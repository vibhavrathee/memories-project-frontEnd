import React, {useState, useEffect} from "react";
import useStyles from './styles'
import FileBase from 'react-file-base64'
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {createPost, updatePost} from '../../actions/posts'
const Form = ({setCurrentId, currentId}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const [postData, setPostData] = useState({
        
        message: '',
        title: '',
        tags: '',
        selectedFile: ''
    })
    const post = useSelector(state => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId) {
            console.log(user, user?.result?.name);
            dispatch(updatePost({...postData, name: user?.result?.name}, currentId));
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}));
        }
        clear();
    }
    
    const clear = () => {
        setCurrentId(null);
        setPostData({ message: '', title: '', tags: '', selectedFile: ''})
    }
    useEffect(() => {
        if(post) {
            setPostData(post)
        }
    }, [post]);
    if(!user?.result?.name) {
        return <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
                Please sign in to create your own memories and like other's memories
            </Typography>
        </Paper>
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate
                className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6"> {currentId ? 'Editing' : 'Creating'} a memory</Typography>
                {/* <TextField name="creator" variant="outlined"
                    label="Creator" fullWidth value={postData.creator}
                    onChange={(e) => setPostData({...postData, creator:e.target.value})}
                /> */}
                <TextField name="title" variant="outlined"
                    label="Title" fullWidth value={postData.title}
                    onChange={(e) => setPostData({...postData, title:e.target.value})}
                />
                <TextField name="message" variant="outlined"
                    label="Message" fullWidth value={postData.message}
                    onChange={(e) => setPostData({...postData, message:e.target.value})}
                />
                <TextField name="tags" variant="outlined"
                    label="Tags" fullWidth value={postData.tags}
                    onChange={(e) => setPostData({...postData, tags:e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} 
                        onDone={({base64}) => setPostData({
                            ...postData, selectedFile: base64
                        })}
                    ></FileBase>
                </div>
                <Button style={{marginBottom: '10px'}} className={classes.buttonSubmit} variant="contained" color="primary" size="large"
                    type="submit" fullWidth>
                        Submit
                </Button>
                <Button variant="contained" color="secondary" size="small"
                    onClick={clear} fullWidth>
                        Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form;