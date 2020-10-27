import React from 'react';
import {connect} from "react-redux";
import Task from "./Task";

class TaskContainer extends React.Component{
    render() {
        return(
            <>
                <Task {...this.props}/>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {

    };
}

export default connect(mapStateToProps,{})(TaskContainer)