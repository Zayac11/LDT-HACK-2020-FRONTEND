import React from 'react';
import Textarea from "../Textarea";
import s from './Practice.module.css'
import TestItem from "./TestItem";

const Practice = (props) => {
    return(
        <>
            <div className={s.mission}>
                {props.task.task.mission}
            </div>
            <div>
                <TestItem tests={props.task.tests} />
            </div>
            {/*Сюда по-хорошему нужно в пропсах передавать код, который ученик мог вводить до этого*/}

            <Textarea
                handleChange={props.handleChange}
                handleSubmit={props.handleSubmit}
                languages={props.task.task.languages}
                code={props.code}
                changeCurrentLanguage={props.changeCurrentLanguage}
            />
            <div className={s.file}>
                <div className={s.fileName}>
                    Или загрузите решение из файла
                </div>
                <div className={s.currentFile}>
                    <input type="file" onChange={props.handleFile}/>
                </div>
            </div>

            <div className={s.testContainer}>
                {
                    props.tests.status ?
                    <div>
                        Процент выполненных тестов: {props.tests.mark}%
                    </div>
                     :
                        <div>
                            {props.tests.error &&
                            props.tests.error.replace(/↵+/g, '\n')
                            }
                        </div>
                }
            </div>
        </>
    )
}

export default Practice