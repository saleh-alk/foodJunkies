import React from 'react'
import { Link } from 'react-router-dom';
import './MainPage.css'

function MainPage() {
    return (
        <>
            <div className='login-option'>
                
                <h1 className='project-title'>Welcome to FoodJunkies</h1>
                
                <div className='login-something'>  <Link to="/login" className='login-links'> Log In</Link></div> 
                <div className='login-something'><Link to="/signup" className='login-links'>Sign Up</Link></div> 
            
            </div>
        </>
    )
}

export default MainPage;