import React from 'react';
import s from './CreateTask.module.css'
import '../../Common/style.css'

const CreateTask = (props) => {
    return(
        <div className='outer'>
            <div className='container'>
                <div><textarea onChange={props.handleUpdate} value={props.taskName} placeholder='Название задания' name="taskName"></textarea></div>
                <div><textarea onChange={props.handleUpdate} value={props.theoryText} placeholder='Теория' name="theoryText"></textarea></div>
                <div><textarea onChange={props.handleUpdate} value={props.missionText} placeholder='Постановка задачи' name="missionText"></textarea></div>
                {
                    props.tests.map(t =>
                    <div key={t.testId}>
                        <div><textarea onChange={props.updateTests} placeholder='Входные данные' value={t.input} name={`input`} ></textarea></div>
                        <div><textarea onChange={props.updateTests} placeholder='Выходные данные' value={t.output} name={`output`} ></textarea></div>
                    </div>)
                }
                <button onClick={props.handleSubmit}>Отправить тест</button>
            </div>
        </div>
    )
}

export default CreateTask