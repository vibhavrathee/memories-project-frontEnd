import React, {useState} from "react";
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import { ButtonBase } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { ThumbUpAltOutlined } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useNavigate } from "react-router";
import { deletePost, likePost } from "../../../actions/posts";
import {useDispatch} from 'react-redux'
const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes);
    const userId = (user?.result?.googleId || user?.result?._id);
    const hasLiked = post?.likes?.find((like) => like === userId)
    const handleLike = () => {
        dispatch(likePost(post._id))
        if(hasLiked) {
            setLikes(post.likes.filter((id) => id !== userId))
        } else {
            setLikes([...post.likes, userId]);
        }
    }
    
    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
                ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
                );
            }

            return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }
    const openPost = () => {
        navigate(`/posts/${post._id}`)
    }
    
    return (
        <Card className={classes.card} raised elevation={6} >
            
            {/* <ButtonBase
                component="span"
                name="test"
                className={classes.cardAction}
                onClick={openPost}
            > */}
            <div onClick={openPost} style={{cursor:'pointer'}}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                (<div className={classes.overlay2}>
                    <Button style={{color: 'white'}} size="small" onClick={(e) => {
                            e.stopPropagation();
                            setCurrentId(post._id)}}>
                        <MoreHorizIcon fontSize="medium"/>
                    </Button>
                </div>)}
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>
                <Typography variant="h5" className={classes.title} gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
            </div>
            {/* </ButtonBase> */}
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result}  onClick={handleLike}>
                    <Likes></Likes>
                    {/* <ThumbUpAltIcon fontSize="small"/>
                    &nbsp; Like &nbsp;
                    {post.likeCount} */}
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
                (<Button size="small" color="secondary" onClick={() => {dispatch(deletePost(post._id))}}>
                    <DeleteIcon fontSize="small"/>
                    Delete
                </Button>)}
            </CardActions>
            
        </Card>
    )
}

export default Post;