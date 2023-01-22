import React from 'react'
import { Link } from 'react-router-dom';
import './MainPage.css'

function MainPage() {
    return (
        <>
            <h1 className='project-title'>Welcome to FoodJunkies</h1>
            <div className='login-option'>
                
                
                <Link to="/login" className='login-links'> Log In</Link>
                <Link to= "/signup" className='login-links'>Sign Up</Link>
            
            </div>
        </>
    )
}

export default MainPage;