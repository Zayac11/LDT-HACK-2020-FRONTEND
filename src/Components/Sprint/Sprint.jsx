import React from 'react';
import s from './Sprint.module.css'
import SprintItem from "./SprintItem";
import '../../Common/style.css'
import {NavLink} from "react-router-dom";


const Sprint = (props) => {
    return(
        <div className={'outer'}>
            <div className={'container'} >
                {props.classData.map(c =>
                    <div className={s.top} key={c.id}>
                        <NavLink to={`/my_classes`} className={s.btnToBack}>
                            Назад
                        </NavLink>
                        <div>
                            {c.name}
                        </div>
                    </div>
                )}
                <div className={s.inner}>
                    {
                        // props.sprints.map( t => t.task.map(m => <SprintItem key={m.id} id={m.id} name={m.status} status={m.status} />))
                        props.sprints.map(t => <SprintItem key={t.id} tasks={t.tasks} name={t.name} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Sprint