import React from 'react';
import s from './Task.module.css'
import {NavLink, Route} from "react-router-dom";
import TheoryContainer from "../Theory/TheoryContainer";
import PracticeContainer from "../Practice/PracticeContainer";

const Task = (props) => {
    return(
        <div className={s.outer}>
            <div className={s.container}>
                    {props.classData.map(c =>
                    <div className={s.top} key={c.id}>
                        <NavLink to={`/course/${c.id}/`} className={s.btnToBack}>
                            Назад
                        </NavLink>
                        <div>
                            {c.name}
                        </div>
                    </div>
                    )}
                <div className={s.nav}>
                    <NavLink to={`/task/${props.task.id}/theory`}
                             activeClassName={s.active}>Theory</NavLink>
                    <NavLink to={`/task/${props.task.id}/practice`}
                         activeClassName={s.active}>Practice</NavLink>
                </div>
                <Route path='/task/:id/theory' render={ () => <TheoryContainer />} />
                <Route path='/task/:id/practice' render={ () => <PracticeContainer />} />
            </div>
        </div>
    )
}

export default Task