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
            <div ref={content} className={s.content}>
                {props.task.map(m => <SprintTask key={m.id} id={m.id} name={m.name} status={m.status} />)}
            </div>
        </div>

    )
}

const SprintTask = (props) => {
    return(
        <div className={s.container} >
            <div className={s.taskName}>{props.name}</div>

            <NavLink to={`/sprints/${props.id}`} className={s.link}> Перейти к таску </NavLink>

            {
                props.status ?
                <div className={s.done}>
                    Дело сделано
                </div> :
                <div className={s.fail}>
                    Опять работать
                </div>
            }
        </div>
    )
}

export default SprintItem