import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserPosts } from '../../store/post'
import { fetchUserProfile, getProfile } from '../../store/profile'
import ProfilePostIndex from '../Profile/ProfilePostIndex';
import './Profile.css';


function Profile() {
    const dispatch = useDispatch()
    const { userId } = useParams()
    let currentProfileUser;
    
    useEffect(()=> {
        dispatch(fetchUserProfile(userId));
        dispatch(fetchUserPosts(userId));
    }, [])
    
    
    currentProfileUser = useSelector(state => state?.profile.profile)
    const posts = Object.values(useSelector(state => state?.post));

    // const currentProfileUser = useSelector(getProfile(userId));

  return (
    <div>
        <h1 id="ProfileUsername">{currentProfileUser?.username}</h1>
        <div>
            <h1 id="ProfilePostsTitle">{posts? "Posts:" : "This user does not have any posts."}</h1>
            <ul>
                {posts?.map((post, i)=> <ProfilePostIndex key={i} post= {post} />)}
            </ul>
        </div>
        
    

        
    </div>
  )
}

export default Profile;


