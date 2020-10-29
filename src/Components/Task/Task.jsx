import React from 'react';
import s from './Task.module.css'
import {NavLink, Route, Switch} from "react-router-dom";
import TheoryContainer from "../Theory/TheoryContainer";
import PracticeContainer from "../Practice/PracticeContainer";

const Task = (props) => {

    return(
        <div className={s.outer}>
            <div className={s.container}>
                <div className={s.nav}>
                    <NavLink to={`/course/${props.task.id}/theory`} className={s.news}
                             activeClassName={s.active}>Theory</NavLink>
                    <NavLink to={`/course/${props.task.id}/practice`} className={s.events}
                         activeClassName={s.active}>Practice</NavLink>
                </div>
                <Route path='/course/:id/theory' render={ () => <TheoryContainer />} />
                <Route path='/course/:id/practice' render={ () => <PracticeContainer />} />
            </div>
        </div>
    )
}

export default Task