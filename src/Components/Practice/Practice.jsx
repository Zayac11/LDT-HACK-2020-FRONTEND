import React from 'react';
import Textarea from "../Textarea";
import s from './Practice.module.css'
import DemoTests from "../DemoTests/DemoTests";
import TestItem from "./TestItem";

const Practice = (props) => {
    debugger
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
                code={props.task_detail.last_code}
                valueCode={props.code}
            />
            {
                props.task_detail.is_done
                ?   <div className={s.done}>
                        Решено верно
                    </div>
                :   <div className={s.fail}>
                        Решено неверно
                    </div>
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