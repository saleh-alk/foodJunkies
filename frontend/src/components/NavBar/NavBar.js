import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { logout } from '../../store/session';
import './NavBar.css';

function NavBar() {
    const loggedIn = useSelector(state => !!state.session.user)
    const dispatch = useDispatch()

    const logoutUser = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    let navbar;

    if(loggedIn) {
        navbar=(
            <>
                <div className='links-nav'>
                <Link to={'/posts'} >All Posts</Link>
                <Link to={'/profile'} >Profile</Link>
                <Link to={'posts/new'}>Write a Post</Link>
                <button onClick={logoutUser}>Logout</button>
                </div>
            </>
            )
         } else {
            navbar=(
                <div className='links-auth'>
                    <Link to={'/login'} className="rightNav">
                        <i className="fas fa-regular fa-right-to-bracket"></i>
                    </Link>
                    <Link to={'/signup'} className="rightNav">
                        <i className="fas fa-regular fa-user-plus"></i>
                    </Link>
                </div>
            )
         }
    
    return (
        <>
        <div id="navbarOuter">
            <NavLink exact to="/" id="title">
                {/* <img src={logo} alt="logo" id="logo"></img> */}
                FoodJunkies
            </NavLink>
            {/* <h1 id="title">FoodJunkies</h1> */}
            {navbar}
        </div>
        </>
    )
}

export default NavBar