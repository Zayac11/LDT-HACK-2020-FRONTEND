import React from 'react';
import Textarea from "../Textarea";
import s from './Practice.module.css'

const Practice = (props) => {
    // debugger
    // const code = props.task_detail[0].last_code
    const code = ""
    return(
        <>
            <div>
                Ну давай, сделай уже что-нибудь... *Постановка задачи*
            </div>
            <div>
                {/*{props.tests.map(t => <TestItem key={t.id} input={t.input} output={t.output} />)}*/}
            </div>
            {/*Сюда по-хорошему нужно в пропсах передавать код, который ученик мог вводить до этого*/}
            <div>
                <select name="languages"> {/*Нужно будет передавать callback'и из классового компонента, а так же локальный state в пропсах*/}
                    <option value="">Python</option>
                    <option value="">C++</option>
                    <option value="">Java</option>
                    <option value="">Pascal</option>
                    <option value="">C</option>
                </select>
            </div>
            <Textarea
                code={code}
            />
            {
                props.correctness
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

export default Practice