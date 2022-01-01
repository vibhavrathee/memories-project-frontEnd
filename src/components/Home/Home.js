import React, {useEffect} from 'react'
import {Container, Grow, Grid} from '@material-ui/core'
import Form from "../Form/Form";
import Posts from '../Posts/Posts'
import { useDispatch } from "react-redux";
import { getPosts } from '../../actions/posts';
import {useState} from 'react'
import useStyles from "../../styles"
const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    return (
        <div>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </div>
    )
}

export default Home
