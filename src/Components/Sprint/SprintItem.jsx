import React from 'react';
import s from './SprintItem.module.css'
import $ from 'jquery'
import {NavLink} from "react-router-dom";

const SprintItem = (props) => {

    let content = React.createRef();
    let tasksContent = () => {
        const el = content
        $(el.current).slideToggle('slow');
    }
    return(
        <div className={s.outer}>
            <div className={s.top}>
                <div>
                    {props.name}
                </div>
                <button onClick={tasksContent}>
                    Появление
                </button>
            </div>
            <div ref={content} className={s.content}> {/*Поле спринта, в котором отрисовывается поле таска*/}
                {props.tasks.map(m => <SprintTask key={m.id} id={m.id} name={m.name} status={m.task_detail[0]} />)}
            </div>
        </div>

    )
}

const SprintTask = (props) => {
    return(
        <div className={s.container} >
            <div className={s.taskName}>{props.name}</div>
            <NavLink to={`/task/${props.id}/theory`} className={s.link}> Перейти к таску </NavLink>

            {
                props.status == undefined || props.status == false ?
                <div className={s.fail}>
                    Опять работать
                </div> :
                <div className={s.done}>
                    Дело сделано
                </div>
            }
        </div>
    )
}

export default SprintItem