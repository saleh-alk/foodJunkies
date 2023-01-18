import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/post';
import PostIndexItem from '../PostIndexItem/PostIndexItem';
import './PostIndex.css';

const PostIndex = () => {
    const dispatch = useDispatch();
    const posts = Object.values(useSelector(store => store.post));

    useEffect(()=>{
        dispatch(fetchPosts());
    },[])

    return (
        <div id='post-index-container'>
            <h1 id='post-index-header'>Post Index</h1>
            <ul id='post-item-list'>
                {posts.map((post,i)=><PostIndexItem key={i} post={post}/>)}
            </ul>
        </div>
    )
}

export default PostIndex;