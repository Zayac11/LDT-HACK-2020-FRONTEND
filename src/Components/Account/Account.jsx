import React from "react";
import '../../Common/style.css'
import s from './Account.module.css'
import {NavLink} from "react-router-dom";

const Account = (props) => {
    return (
        <div className='outer'>
            <div className='container'>
                <div className={s.inner}>
                    <NavLink to={'/my_classes'} className={s.backBtn}>
                        Вернуться назад
                    </NavLink>
                    <div className={s.data}>
                        <h2 className={s.title}>Личный кабинет</h2>
                        <div className={s.dataList}>
                            <div className={s.dataItem}>
                                ФИО: {props.data.last_name} {props.data.first_name} {props.data.middle_name}
                            </div>
                            <div className={s.dataItem}>
                                E-mail: {props.data.email}
                            </div>
                            <div className={s.dataItem}>
                                Дата рождения: {props.data.date_of_birth}
                            </div>
                            <div className={s.dataItem}>
                                Учебное заведение: {props.data.school}
                            </div>
                        </div>
                    </div>
                    <div className={s.changePass}>
                        <h2 className={s.title}>Изменение пароля</h2>

                            <input type="password" value={props.oldPassword} className={s.formInputContainer} onChange={props.handleInputChange} name={'oldPassword'} placeholder='Старый пароль'/>

                            <input type='password' value={props.newPassword} className={s.formInputContainer} onChange={props.handleInputChange} name={'newPassword'} placeholder='Новый пароль' />

                            <input type='password' value={props.repeatPassword} className={s.formInputContainer} onChange={props.handleInputChange} name={'repeatPassword'} placeholder='Повторите пароль' />

                            <button onClick={props.handleSubmit}>Сменить пароль</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account