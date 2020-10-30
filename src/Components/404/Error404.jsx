import React from 'react';
import './404.css'

const Error404 = () => {
    return(
        <div className='error-container'>
            <figure className='main-figure'>
                <div className="sad-mac"></div>
                <div className={'error-text'}>
                    404 Page not Found
                </div>
            </figure>
        </div>
    )
}

export default Error404