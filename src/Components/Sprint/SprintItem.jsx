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
                    <div className={s.sprintName}>
                        {props.name}
                    </div>
                    {
                        props.isTeacher &&
                        <div className={s.deleteBtn}>
                            <button onClick={props.handleDeleteSprint} id={props.sprintId}>Удалить блок</button>
                            {
                                props.editMode && props.mutableSprintId === props.sprintId ?
                                <div>
                                    <input onDoubleClick={props.declineInput} autoFocus={true} onChange={props.handleUpdate} type="text" name='sprintName'/>
                                    <button onClick={props.deactivateEditMode} id={props.sprintId}>Добавить</button>
                                </div>
                                    : <button onClick={props.activateEditMode} id={props.sprintId}>Изменить блок</button>
                            }
                        </div>
                    }

                    <div onClick={tasksContent} className={s.arrow}> {/*Стрелка вниз*/}
                        <span className={s.arrowLeft}></span>
                        <span className={s.arrowRight}></span>
                    </div>

                </div>
                <div ref={content} className={s.content}> {/*Поле спринта, в котором отрисовывается поле таска*/}
                    {
                        !props.tasks || props.tasks.length === 0 ?
                            <div className={s.noTask}>
                                Нет заданий
                            </div>:
                        props.tasks.map(m => <SprintTask key={m.id} isTeacher={props.isTeacher} sprintId={props.sprintId} id={m.id} name={m.name} status={m.task_detail[0]} />
                        )
                    }
                    {
                        props.isTeacher &&
                        <NavLink to={`/create_task/${props.sprintId}`} className={s.addTask}>Добавить задание</NavLink>
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
                props.status === undefined || props.status.is_done === false ?
                    <div className={s.fail}>
                        <img src={cross} alt="done"/>
                    </div> :
                    <div className={s.done}>
                        <img src={check} alt="done"/>
                    </div>
            }
            <div className={s.container}>
                <div className={s.taskName}>{props.name}</div>
                {props.isTeacher &&
                <NavLink to={`/update_task/${props.id}`}>Изменить задание</NavLink>}
                <NavLink to={`/task/${props.id}/theory`} className={s.link}> Перейти к заданию </NavLink>
            </div>

        </div>
    )
}

export default SprintItem