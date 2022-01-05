import React, {useEffect} from 'react'
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core'
import { useNavigate } from 'react-router';
import { useLocation, Navigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import Form from "../Form/Form";
import Posts from '../Posts/Posts'
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from '../../actions/posts';
import {useState} from 'react'
import useStyles from "./styles"
import  Pagination  from '../Pagination';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')
    console.log("Home ", page);
    const classes = useStyles();

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([])
    console.log(search);

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            //search Post
            // searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }
    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag!==tagToDelete))
    }

    const searchPost = () => {
        if(search.trim() || tags) {
            // dispatch => fetch search post
                            // [europe, usa] => 'europe, usa' 
            dispatch(getPostsBySearch({search, tags: tags.join(',')}))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            navigate("/");
        }
    }

    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId, dispatch]);

    return (
        <div>
            <Grow in>
                <Container maxWidth="xl">
                    <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField 
                                    name="search" 
                                    variant="outlined"
                                    label="Search Memories"
                                    onKeyPress={handleKeyPress}
                                    fullWidth
                                    value={search}
                                    onChange={(e) => {setSearch(e.target.value)}}>
                                </TextField>
                                <ChipInput 
                                    style={{margin: '10px 0'}}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search Tags"
                                    variant="outlined"
                                />
                                <Button onClick={searchPost} className={classes.searchButton}
                                        color="primary" variant="contained">
                                    Search
                                </Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            {(!searchQuery && !tags.length) &&
                                (<Paper elevation={6} className={classes.pagination}>
                                    <Pagination page={page}/>
                                </Paper>)
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home
