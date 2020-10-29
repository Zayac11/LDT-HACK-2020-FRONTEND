import React from 'react';
import {getClass} from "../redux/auth-reducer";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

class Myclass extends React.Component{

    componentDidMount() {
        this.props.getClass()
    }

    render() {
        return(
            <>
                {
                    this.props.classData.map(c =>
                    <div key={c.id}>
                        <div>
                            {c.name}
                        </div>
                        <NavLink to={`/course/${c.id}`}>Перейди на этот курс</NavLink>
                    </div>
                    )
                }
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        classData: state.auth.classData
    }
}

export default connect(mapStateToProps,{getClass})(Myclass)