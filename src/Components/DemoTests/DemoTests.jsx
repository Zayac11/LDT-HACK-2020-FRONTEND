import React from 'react';
import s from './DemoTests.module.css'

const DemoTests = (props) => {
    return(
        <div className={s.test}>
            <div className={s.result}>
                Результат теста:
            </div>
            {props.error}
        </div>
    )
}

export default DemoTests