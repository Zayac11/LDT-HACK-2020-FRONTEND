import React from 'react';
import s from './Theory.module.css'

const Theory = (props) => {
    return(
        <div className={s.outer}>
                <div className={s.theory}>
                    {props.theory}
                </div>
                <div>
                    Примеры ввода и вывода:
                </div>
                <div>
                    {props.tests.map(t => <TestItem key={t.id} input={t.input} output={t.output} />)}
                </div>
        </div>
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

export default Theory