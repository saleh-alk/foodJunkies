import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserProfile, getProfile } from '../../store/profile'

function Profile() {
    // const currentUser = useSelector(state => state.session)
    const dispatch = useDispatch()
    const { userId } = useParams()

    useEffect(()=> {
        dispatch(fetchUserProfile(userId))
    }, [])

    // const currentProfileUser = useSelector(getProfile(userId));

  return (
    <div>
        {/* <h1>{currentProfileUser.username}</h1> */}
    

        
    </div>
  )
}

export default Profile;


