import React from 'react';
import Textarea from "../Textarea";
import s from './Practice.module.css'

const Practice = (props) => {
    const task_detail = props.task.task_detail[0]
    return(
        <>


            <div>
                {props.task.mission}
            </div>
            <div>
                {/*{props.tests.map(t => <TestItem key={t.id} input={t.input} output={t.output} />)}*/}
            </div>
            {/*Сюда по-хорошему нужно в пропсах передавать код, который ученик мог вводить до этого*/}
            <select name="languages"> {/*Нужно будет передавать callback'и из классового компонента, а так же локальный state в пропсах*/}
                {
                    props.task.languages.map(l => <Selection key={l.id} value={l} />)
                }
            </select>
            <Textarea
                code={task_detail.last_code}
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

        </>
    )
}

const TestItem = (props) => {
    return(
        <div className={s.testItem}>
            <div>
                Input:
                {props.input}
            </div>
            <div>
                Output:
                {props.output}
            </div>
        </div>
    )
}

const Selection = (props) => {
    return(
        <option value="">{props.value}</option>
    )
}

export default Practice