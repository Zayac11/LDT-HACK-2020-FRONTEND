import React from 'react';
import s from './CreateTask.module.css'
import '../../Common/style.css'
import Error404 from "../404/Error404";

const CreateTask = (props) => {

    if(!props.isTeacher) {
        return <Error404 />
    }
    return(
        <div className='outer'>
            <div className='container'>
                <div><textarea onChange={props.handleUpdate} value={props.taskName} placeholder='Название задания' name="taskName"></textarea></div>
                <div><textarea onChange={props.handleUpdate} value={props.theoryText} placeholder='Теория' name="theoryText"></textarea></div>
                <div><textarea onChange={props.handleUpdate} value={props.missionText} placeholder='Постановка задачи' name="missionText"></textarea></div>
                <div>
                    Первые 3 теста будут видны ученику
                </div>
                <div className={s.test}>
                {
                    props.tests.map(t =>
                        <div className={s.testInner} key={t.testId}>
                            <div>Данные на вход<textarea onChange={props.updateTests} placeholder='Входные данные' id={t.testId} value={t.input} name={`question`} ></textarea></div>
                            <div>Данные на выходе<textarea onChange={props.updateTests} placeholder='Выходные данные' id={t.testId} value={t.output} name={`answer`} ></textarea></div>
                        </div>)
                }
                </div>
                {
                     props.tests.length > 12 ? <div className={s.attention}>Достигнуто максимальное число тестов</div>:
                         <button className={s.taskBtn} onClick={props.addTest} name={'tests'}> Добавить тест </button>
                }
                <div>
                    Выберите языки программирования, подходящие для решения задачи
                </div>

                <div className={s.checkboxEl}>
                    <input onChange={props.handleUpdate} type="checkbox" name='python'/> <div>python</div>
                </div>
                <div className={s.checkboxEl}>
                    <input onChange={props.handleUpdate} type="checkbox" name='cpp'/> <div>cpp</div>
                </div>
                <div className={s.checkboxEl}>
                    <input onChange={props.handleUpdate} type="checkbox" name='java'/> <div>java</div>
                </div>
                <div className={s.checkboxEl}>
                    <input onChange={props.handleUpdate} type="checkbox" name='c_sharp'/> <div>c_sharp</div>
                </div>
                <div className={s.checkboxEl}>
                    <input onChange={props.handleUpdate} type="checkbox" name='pascal'/> <div>pascal</div>
                </div>

                <div className={s.limitation}>
                    <div>Ограничение по времени(ms)<textarea onChange={props.handleUpdate} placeholder='' value={props.timeLimit} name={`timeLimit`} ></textarea></div>
                    <div>Ограничение по памяти(ГБ)<textarea onChange={props.handleUpdate} placeholder='' value={props.memoryLimit} name={`memoryLimit`} ></textarea></div>
                </div>
                {props.isChange ?
                    <div className={s.testInner}>
                        <button className={s.submitBtn} onClick={props.handleDelete}>Удалить таск</button>
                        <button className={s.submitBtn} onClick={props.handleSubmit}>Изменить таск</button>
                    </div>
                    : <button className={s.submitBtn} onClick={props.handleSubmit}>Отправить таск</button>
                }

            </div>
        </div>
    )
}

export default CreateTask