import React from 'react';
import s from './CreateTask.module.css'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import CreateTask from "./CreateTask";
import {SendTask} from "../../redux/sprint-reducer";

class CreateTaskContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            sprintId: "",
            taskName: "",
            theoryText: "",
            missionText: "",
            tests: [{
                input: "",
                output: "",
                testId: 0,
            },],
        };
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateTests = this.updateTests.bind(this);
    }

    handleUpdate(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    updateTests(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            tests: this.state.tests.map(test => ({
                ...test,
                [name]: value
            }))
        });
    }

    handleSubmit() {
        this.props.SendTask(this.state.taskName, 228, this.state.theoryText, this.state.missionText, this.state.tests, this.state.sprintId)
    }

    componentDidMount() {

        this.setState({
            sprintId: Math.floor(this.props.match.params.id)
        })
    }

    render() {
        return(
            <CreateTask sprintId={this.props.match.params.id}
                        handleUpdate={this.handleUpdate}
                        updateTests={this.updateTests}
                        handleSubmit={this.handleSubmit}
                        tests={this.state.tests}
                        missionText={this.state.missionText}
                        theoryText={this.state.theoryText}
                        taskName={this.state.taskName}

            />
        )
    }
}

let WithCreateTaskUrl = withRouter(CreateTaskContainer);

let mapStateToProps = (state) => {
    return{

    }
}

export default connect(mapStateToProps,{SendTask})(WithCreateTaskUrl)