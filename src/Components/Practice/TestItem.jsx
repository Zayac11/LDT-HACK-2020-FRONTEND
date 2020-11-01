import React from 'react';
import s from './TestItem.module.css'

const TestItem = (props) => {

    return(
        <div className={s.testsContainer}>
            {
                props.tests.map(t => (
                    t.is_visible &&
                    <div key={t.id} className={s.testItem}>
                        <div className={s.input}>
                            Входные данные:
                            <div>
                                {t.question}
                            </div>
                        </div>
                        <div className={s.output}>
                            Выходные данные:
                            <div>
                                {t.answer}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default TestItem