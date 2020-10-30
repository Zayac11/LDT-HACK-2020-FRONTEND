import React from 'react';
import s from './SprintItem.module.css'
import $ from 'jquery'
import {NavLink} from "react-router-dom";
import check from '../../assets/images/check.png'
import cross  from '../../assets/images/cross.png'

const SprintItem = (props) => {

    let content = React.createRef();
    let tasksContent = () => {
        const el = content
        $(el.current).slideToggle('slow');
    }
    return(
        <>

            <div className={s.outer}>
                <div className={s.top}>
                    <div>
                        {props.name}
                    </div>
                    <div onClick={tasksContent} className={s.arrow}>
                        <span className={s.arrowLeft}></span>
                        <span className={s.arrowRight}></span>
                    </div>
                </div>
                <div ref={content} className={s.content}> {/*Поле спринта, в котором отрисовывается поле таска*/}
                    {
                        props.tasks ?
                        props.tasks.map(m => <SprintTask key={m.id} id={m.id} name={m.name} status={m.task_detail[0]} />
                        ):
                        <div>
                            Нет заданий
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

const SprintTask = (props) => {
    return(
        <div className={s.row}>
            {
                props.status === undefined || props.status === false ?
                    <div className={s.fail}>
                        <img src={cross} alt="done"/>
                    </div> :
                    <div className={s.done}>
                        <img src={check} alt="done"/>
                    </div>
            }
            <div className={s.container}>
                <div className={s.taskName}>{props.name}</div>
                <NavLink to={`/task/${props.id}/theory`} className={s.link}> Перейти к заданию </NavLink>
            </div>

        </div>
    )
}

export default SprintItem