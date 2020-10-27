import React from 'react';
import s from './Navbar.module.css'
import logo from '../../assets/images/logo.png'

const Navbar = (props) => {
    return(
        <div className={s.outer}>
            <div className={s.container}>
                <div className={s.name}>
                    <img src={logo} alt="logo"/>
                    <div>Название</div>
                </div>
                <div className={s.user}>
                    {/*{props.name}*/}
                    <div>Фамилия И.О.</div>
                    <button onClick={props.logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar