import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserProfile } from '../../store/profile'

function Profile() {
    // const currentUser = useSelector(state => state.session)
    const dispatch = useDispatch()
    const { userId } = useParams()

    useEffect(()=> {
        dispatch(fetchUserProfile(userId))
    }, [])

  return (
    <div>
        hi
    </div>
  )
}

export default Profile


