import React from 'react';
import s from './Theory.module.css'

const Theory = (props) => {
    return(
        <div className={s.outer}>
                <div className={s.theory}>
                    {props.theory}
                </div>
                <div>
                    {/*{props.tests.map(t => <TestItem key={t.id} input={t.input} output={t.output} />)}*/}
                </div>
        </div>
    )
}



export default Theory