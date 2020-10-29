import React from 'react';
import s from './Sprint.module.css'
import SprintItem from "./SprintItem";

const Sprint = (props) => {
    return(
        <div className={s.outer}>
            <div className={s.container} >
                {props.classData.map(c =>
                    <div key={c.id} className={s.classNumber}>
                        {c.name}
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