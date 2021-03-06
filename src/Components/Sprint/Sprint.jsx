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
                    )
                }
                {
                    props.isTeacher &&
                        <div className={s.addSprint}>
                            <div><textarea className={s.addText} onChange={props.handleUpdate} value={props.sprintText} name="sprintText" placeholder='Название блока'></textarea></div>
                            <button className={s.addBtn} onClick={props.handleSubmit}>
                                Добавить
                            </button>
                        </div>
                } {/*Отображение спринтов*/}
                <div className={s.inner}>
                    {
                        props.sprints.map(t => <SprintItem key={t.id} deactivateEditMode={props.deactivateEditMode}  activateEditMode={props.activateEditMode}
                                                           handleDeleteSprint={props.handleDeleteSprint} sprintId={t.id} declineInput={props.declineInput}
                                                           handleUpdate={props.handleUpdate} editMode={props.editMode} mutableSprintId={props.mutableSprintId}
                                                           isTeacher={props.isTeacher} tasks={t.tasks} name={t.name} />) //мапается массив спринтов
                    }
                </div>
            </div>
        </div>
    )
}

export default Sprint