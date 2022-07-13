import React from 'react'
import './PageError.css'
import image1 from '../Images/error404.png';
import { Link } from 'react-router-dom';

function PageError() {
    return (
        <div className='page' id='pagetop'>
            <div className='pageerror' >
                <div className='image'>
                    <img src={image1} alt='hello' />
                </div>
                <h1>Oops... Page Not Found!</h1>
                <p>The page which you are looking for does not exist galley of type and scrambled it to make a type
                    specimen book. Please return to the homepage.
                </p>
                <button className='page-button'> <Link to='/'>Back To Homepage </Link></button>
            </div>
        </div>
    )
}

export default PageError