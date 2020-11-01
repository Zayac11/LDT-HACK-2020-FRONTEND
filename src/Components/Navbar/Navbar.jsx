import React from 'react';
import s from './Navbar.module.css'
import logo from '../../assets/images/logo.png'
import {NavLink} from "react-router-dom";

const Navbar = (props) => {
    return(
        <div className={s.outer}>
            <div className={s.container}>
                <div className={s.name}>
                    <NavLink to={'/my_classes'}>
                        <img src={logo} alt="logo"/>
                    </NavLink>
                    <div>Портал дистанционного обучения</div>
                </div>
                <div className={s.user}>
                    {/*{props.name}*/}
                    <NavLink to='/account'>Личный кабинет</NavLink>
                    <button className={s.logout} onClick={props.logout}>Выйти</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar