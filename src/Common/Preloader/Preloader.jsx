import React from 'react';
import fetchingLoader from '../../assets/images/loader.svg';
import s from './Preloader.module.css'

let Preloader = () => {
    return (
        <div className={s.preloaderContainer} >
            <img src={fetchingLoader} alt='preloader' />
        </div>
    );
}

export default Preloader;