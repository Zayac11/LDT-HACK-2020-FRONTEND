import React from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {SendTask} from "../../redux/sprint-reducer";
import CreateTaskContainer from "./CreateTaskContainer";

class UpdateTaskContainer extends React.Component{

    componentDidMount() {

    }

    render() {
        return(
            <CreateTaskContainer isChange={true}/>
        )
    }
}

let WithUpdateTaskUrl = withRouter(UpdateTaskContainer);

let mapStateToProps = (state) => {
    return{
        sprints: state.sprintPage.sprints,
        isTeacher: state.auth.isTeacher
    }
}

export default connect(mapStateToProps,{SendTask})(WithUpdateTaskUrl)