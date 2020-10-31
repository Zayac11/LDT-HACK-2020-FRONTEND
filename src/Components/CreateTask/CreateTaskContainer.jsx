import React from 'react';
import s from './CreateTask.module.css'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import CreateTask from "./CreateTask";
import {deleteTask, getSprints, getTask, SendTask, updateTask} from "../../redux/sprint-reducer";

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
            memoryLimit: "",
            isChange: false
        };
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
                languages: this.state.languages.filter( //фильтруем массив, удаляя из него совпадения по имени я.п.
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

    handleSubmit() { //Создать таск
        console.log(this.state)
        if(this.state.isChange) {
            this.props.updateTask(this.state.taskName, Math.floor(this.state.sprintId), this.state.theoryText, this.state.missionText, this.state.demoTests,
                this.state.tests, this.state.languages, this.state.timeLimit, this.state.memoryLimit)
        }
        else {
            // this.props.SendTask(this.state.taskName, 228, this.state.theoryText, this.state.missionText, this.state.demoTests,
            //     this.state.tests, this.state.sprintId, this.state.languages, this.state.timeLimit, this.state.memoryLimit)
        }

    }

    handleDelete() {
        this.props.deleteTask(Math.floor(this.state.sprintId)) //id Таска
        //После делета можно сделать гет запрос за новым спринтом
    }

    componentDidMount() {
        let sprintId = this.props.match.params.id //id спринта при добавлении таска или id таска при его изменении или удалении

        if(!this.props.sprints.length > 0) { //Если спринты не подгрузились, то вызываем функцию для вызова отсюда
            this.props.getSprints(this.props.classData[0].id) //гетаем спринты по id КЛАССА
        }

        if(this.props.isChange) {
            this.props.getTask(sprintId)
            this.setState({
                isChange: this.props.isChange
            })
        }

        this.setState({
            sprintId: sprintId
        })

        this.props.sprints.map(s =>
            s.id === Math.floor(this.props.match.params.id) ?
                this.setState({
                    isChange: true,
                }): null
        )

    }

    render() {
        return(
            <CreateTask isTeacher={this.props.isTeacher}
                        isChange={this.props.isChange}
                        handleUpdate={this.handleUpdate}
                        updateTests={this.updateTests}
                        updateDemoTests={this.updateDemoTests}
                        handleSubmit={this.handleSubmit}
                        handleDelete={this.handleDelete}
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
        classData: state.auth.classData,
        sprints: state.sprintPage.sprints,
        isTeacher: state.auth.isTeacher
    }
}

export default connect(mapStateToProps,{getSprints,SendTask,updateTask,getTask,deleteTask})(WithCreateTaskUrl)