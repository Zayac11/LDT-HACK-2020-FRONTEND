import React from 'react';
import {connect} from "react-redux";
import Task from "./Task";
import {withRouter} from "react-router-dom";
import {getTask} from "../../redux/sprint-reducer";

class TaskContainer extends React.Component{

    componentDidMount() {
        let taskId = this.props.match.params.id
        //Метод получения инофрмации по конкретному таску
        this.props.getTask(taskId)
    }

    render() {
        return(
            <>
            {
                this.props.isFetching ? null : <Task {...this.props}/>
            }
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        task: state.sprintPage.task,
        isFetching: state.sprintPage.isFetching,
        classData: state.auth.classData,
    };
}

let WithTaskUrl = withRouter(TaskContainer);

export default connect(mapStateToProps,{getTask})(WithTaskUrl)