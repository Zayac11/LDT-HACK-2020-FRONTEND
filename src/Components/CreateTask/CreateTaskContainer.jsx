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
            demoTests: [{
                input: "",
                output: "",
                testId: 0,
            },],
            tests: [{
                input: "",
                output: "",
                testId: 0,
            },],
            languages: [],
            timeLimit: "",
            memoryLimit: ""
        };
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateDemoTests = this.updateDemoTests.bind(this);
        this.updateTests = this.updateTests.bind(this);
        this.addTest = this.addTest.bind(this);
    }

    handleUpdate(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        target.type !== 'checkbox' &&
        this.setState({
            [name]: value
        })
        target.type === 'checkbox' &&
             value ?
            this.setState({
                languages: [...this.state.languages, name]
            }) :
            this.setState({
                languages: this.state.languages.filter( //фильтруем массив, удаляя из него совпадения
                    (l) => {
                        return l !== name
                    }
                )
            })
    }
    updateDemoTests(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const id = Math.floor(target.id)

        this.setState({
            demoTests: this.state.demoTests.map(test => test.testId === id ?
                ({
                    ...test,
                    [name]: value
                }):{...test})
        });
    }
    updateTests(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const id = Math.floor(target.id)

        this.setState({
            tests: this.state.tests.map(test => test.testId === id ?
            ({
                ...test,
                [name]: value
            }):{...test})
        });

    }

    handleSubmit() {
        console.log(this.state)
        // this.props.SendTask(this.state.taskName, 228, this.state.theoryText, this.state.missionText, this.state.demoTests,
        //     this.state.tests, this.state.sprintId, this.state.languages, this.state.timeLimit, this.state.memoryLimit)
    }

    addTest(event) {

        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: [...this.state.[name], { //Ошибки НЕТ
                input: "",
                output: "",
                testId: this.state.[name].length,
            }]
        })

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
                        updateDemoTests={this.updateDemoTests}
                        handleSubmit={this.handleSubmit}
                        addTest={this.addTest}
                        demoTests={this.state.demoTests}
                        tests={this.state.tests}
                        missionText={this.state.missionText}
                        theoryText={this.state.theoryText}
                        taskName={this.state.taskName}
                        timeLimit={this.state.timeLimit}
                        memoryLimit={this.state.memoryLimit}
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