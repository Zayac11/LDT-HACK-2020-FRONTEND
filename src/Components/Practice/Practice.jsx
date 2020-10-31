import React from 'react';
import Textarea from "../Textarea";
import s from './Practice.module.css'
import DemoTests from "../DemoTests/DemoTests";

const Practice = (props) => {
    debugger
    const task_detail = props.task.task.task_detail[0]
    return(
        <>
            <div className={s.mission}>
                {props.task.mission}
            </div>
            <div>
                {/*{props.tests.map(t => <TestItem key={t.id} input={t.input} output={t.output} />)}*/}
            </div>
            {/*Сюда по-хорошему нужно в пропсах передавать код, который ученик мог вводить до этого*/}

            <Textarea
                handleChange={props.handleChange}
                handleSubmit={props.handleSubmit}
                languages={props.task.task.languages}
                code={task_detail.last_code}
                valueCode={props.code}
            />
            {
                task_detail.is_done
                ?   <div className={s.done}>
                        Решено верно
                    </div>
                :   <div className={s.fail}>
                        Решено неверно
                    </div> //Тут можно будет создать компонент, в котором будут показаны ошибки
            }
            <div className={s.testContainer}>
                {
                    props.tests.length > 0 &&
                    props.tests.map(t =>
                        <DemoTests key={t.test_num} status={t.status} error={t.error}  />
                    )
                }
            </div>



        </>
    )
}

export default Practice