import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../store/session'
import './NavBar.css'

function NavBar() {
    const loggedIn = useSelector(state => !!state.session.user)
    const dispatch = useDispatch()

    const logoutUser = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    const getLinks = () => {
        loggedIn ? (
            <div className='links-nav'>
                <Link to={'/posts'} >All Posts</Link>
                <Link to={'/profile'} >Profile</Link>
                <Link to={'posts/new'}>Write a Post</Link>
                <button onClick={logoutUser}>Logout</button>

            </div>
        ) : (
            <div className='links-auth'>
                <Link to={'/login'}>login</Link>
                <Link to={'/signup'}>Signup</Link>
            </div>
        )
    }
    return (
        <>
            <h1>FoodJunkies</h1>
            { loggedIn ? (
            <div className='links-nav'>
                <Link to={'/posts'} >All Posts</Link>
                <Link to={'/profile'} >Profile</Link>
                <Link to={'posts/new'}>Write a Post</Link>
                <button onClick={logoutUser}>Logout</button>

            </div>
            ) : (
            <div className='links-auth'>
                <Link to={'/login'}>login</Link>
                <br></br>
                <Link to={'/signup'}>Signup</Link>
            </div>
        )}
    
        </>
    )
}

export default NavBar