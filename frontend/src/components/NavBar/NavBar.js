import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { logout } from '../../store/session';
import logo from "../../Assets/Images/foodjunkies-high.png";
import './NavBar.css';
import { Badge } from 'antd';
import SearchBar from '../SearchBar/SearchBar';

function NavBar() {
    const loggedIn = useSelector(state => !!state.session.user)
    const {cart} = useSelector(state => ({...state}))
    const dispatch = useDispatch()

    const currentUserId = useSelector(state=> state.session.user?._id)

    const logoutUser = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    let navbar;

    if(loggedIn) {
        navbar=(
            <>
                <div className='links-nav'>
                <Link to={'/posts'} className="rightNav"><i className="fa-solid fa-images"></i></Link>
                <Link to={`/profile/${currentUserId}`} className="rightNav"><i className="fa-sharp fa-solid fa-user"></i></Link>
                <Link to={'/posts/new'} className="rightNav"><i className="fa-solid fa-camera-retro"></i></Link>
                <Link to="/cart" className="rightNav">
                    <Badge count={cart.length} offset={[9, 0]} className="rightNav">
                    <i class="fa-solid fa-cart-shopping"></i>
                    </Badge>
                </Link>
                <button onClick={logoutUser} id="logoutButton">Logout</button>
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
                <img src={logo} alt="logo" id="logo"></img>
            </NavLink>
            <SearchBar/>
            {/* <h1 id="title">FoodJunkies</h1> */}
            {navbar}

        </div>
        </>
    )
}

export default NavBar