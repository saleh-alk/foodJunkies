import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/post';
import './PostIndex.css';

const PostIndex = () => {
    const dispatch = useDispatch();
    const posts = useSelector(store => store.post);

    useEffect(()=>{
        dispatch(fetchPosts());
    },[])

    return (
        <div>
            <h1>Post Index</h1>
        </div>
    )
}

export default PostIndex;