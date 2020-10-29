import React from 'react';
import Textarea from "../Textarea";
import s from './Practice.module.css'

const Practice = (props) => {
    return(
        <>
            <div>
                Ну давай, сделай уже что-нибудь...
            </div>
            {/*Сюда по-хорошему нужно в пропсах передавать код, который ученик мог вводить до этого*/}
            <Textarea />
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

export default Practice