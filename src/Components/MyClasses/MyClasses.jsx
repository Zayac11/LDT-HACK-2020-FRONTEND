import React from 'react';
import {getClass} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import s from './MyClasses.module.css'
import '../../Common/style.css'

class MyClasses extends React.Component{

    componentDidMount() {
        // this.props.getClass()
    }

    render() {
        return(
            <div className='outer'>
                <div className='container'>
                    <div className={s.inner}>
                        <div className={s.list}>
                            Список моих классов
                        </div>

                        {
                            this.props.classData.map(c =>
                                <div key={c.id} className={s.nameOuter}>
                                    <div className={s.name}>
                                        {c.name}
                                    </div>
                                    <NavLink className={s.link} to={`/course/${c.id}`}>Перейти к курсам</NavLink>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        classData: state.auth.classData
    }
}

export default connect(mapStateToProps,{getClass})(MyClasses)