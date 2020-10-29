import React from 'react';
import {connect} from "react-redux";
import Task from "./Task";
import {withRouter} from "react-router-dom";

class TaskContainer extends React.Component{

    componentDidMount() {

        let taskId =this.props.match.params.id

        //Метод получения инофрмации по конкретному таску
        //this.props.getTask(taskId)

    }

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
        task: state.sprintPage.task
    };
}

let WithTaskUrl = withRouter(TaskContainer);

export default connect(mapStateToProps,{})(WithTaskUrl)