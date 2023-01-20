import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserPosts } from '../../store/post'
import { fetchUserProfile, getProfile } from '../../store/profile'
// import { getUserReviews } from '../../store/review';
import ProfilePostIndex from '../Profile/ProfilePostIndex';
import PostIndexItem from '../PostIndexItem/PostIndexItem';
import './Profile.css';

function Profile() {
    const dispatch = useDispatch()
    const { userId } = useParams()
    let currentProfileUser = useSelector(state => state?.profile.profile);
    const posts = Object.values(useSelector(state => state?.post));
    // const reviews = Object.values(useSelector(state => state?.reviews));
    const [contentState,setContentState] = useState('posts');
    
    useEffect(()=> {
        dispatch(fetchUserProfile(userId));
        dispatch(fetchUserPosts(userId));
        // dispatch(getUserReviews(userId));
    }, [])

    let profileContent;
    if (contentState === 'posts') {
        profileContent = (
            <div>
                <h1 id="ProfilePostsTitle">{posts ? "Posts:" : "This user does not have any posts."}</h1>
                <ul>
                    {posts?.map((post, i)=> <PostIndexItem key={i} post= {post} />)}
                </ul>
            </div>
        )
    } 
    // else if (contentState === 'reviews') {
    //     profileContent = (
    //         <div>
    //             <h1 id="ProfilePostsTitle">{reviews ? "Reviews:" : "This user does not have any reviews."}</h1>
    //         </div>
    //     )
    // } 
    else {
        profileContent = (
            <div>
                <h1 id="ProfilePostsTitle">Contact:</h1>
            </div>
        )
    }

    return (
    <div>
        <h1 id="ProfileUsername">{currentProfileUser?.username}</h1>
        <div id='user-button-group'>
            <div id='user-button-group-button-left' className='user-button-group-button' onClick={()=>setContentState('posts')}>Posts</div>
            <div className='user-button-group-button' onClick={()=>setContentState('reviews')}>Reviews</div>
            <div id='user-button-group-button-right' className='user-button-group-button' onClick={()=>setContentState('contact')}>Contact</div>
        </div>
        {profileContent}
    </div>
  )
}

export default Profile;


