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
            tests: [{
                question: "",
                answer: "",
                is_visible: true,
                testId: 0,
            },],
            languages: [],
            timeLimit: "",
            memoryLimit: "",
            isChange: false,
            allTests:[]
        };
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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



        const langes = this.state.languages.filter( (l) =>
            l !== name
        )
        target.type === 'checkbox' &&
             value ?
            this.setState({
                languages: [...langes, name]
            }) :
            this.setState({
                languages: langes.filter( //фильтруем массив, удаляя из него совпадения по имени я.п.
                    (l) => {
                        return l !== name
                    }
                )
            })
    }

    updateTests(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const id = Math.floor(target.id)

        id < 3 ?
        this.setState({
            tests: this.state.tests.map(test => test.testId === id ?
            ({
                ...test,
                [name]: value,
                is_visible: true
            }):{...test})
        }):
        this.setState({
            tests: this.state.tests.map(test => test.testId === id ?
                ({
                    ...test,
                    [name]: value,
                    is_visible: false
                }):{...test})
        })

    }

    addTest(event) {

        const target = event.target;
        const name = target.name;

        this.setState({
            tests: [...this.state.tests, { //Ошибки НЕТ
                question: "",
                answer: "",
                is_visible: false,
                testId: this.state.tests.length,
            }]
        })

    }

    handleSubmit() { // Создать/изменить таск
        console.log(this.state)
        console.log(this.state.allTests)
        debugger

        // this.setState({
        //     tests: [
        //         this.state.tests.map(t =>({
        //             ...t,
        //             testId: ""
        //         }) )
        //     ]
        // })

        if(this.state.isChange) {
            this.props.updateTask(this.state.taskName, Math.floor(this.state.sprintId), this.state.theoryText, this.state.missionText, this.state.demoTests,
                this.state.tests, this.state.languages, this.state.timeLimit, this.state.memoryLimit)
        }
        else {
            this.props.SendTask(this.state.taskName, this.state.theoryText, this.state.missionText,
                this.state.tests, Math.floor(this.state.sprintId), this.state.languages, this.state.timeLimit, this.state.memoryLimit)
        }

    }

    handleDelete() {
        this.props.deleteTask(Math.floor(this.state.sprintId)) //В данном случае, это id ТАСКА, а не его спринта
        //После делета можно сделать гет запрос за новым спринтом
    }

    componentDidMount() {
        let sprintId = this.props.match.params.id //id спринта при добавлении таска или id таска при его изменении или удалении

        if(!this.props.sprints.length > 0) {
            //Если спринты не подгрузились, то вызываем функцию для вызова отсюда
            this.props.getSprints(this.props.classData[0].id) //гетаем спринты по id КЛАССА
        }

        if(this.props.isChange) {
            this.props.getTask(sprintId)
            this.setState({
                isChange: this.props.isChange
            })
        }
        this.setState({
            sprintId: sprintId,
        })

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if((prevProps.task.length === 0 && this.props.task.length === 1 ) || prevProps.task !== this.props.task) {
            const task = this.props.task
            this.setState({
                taskName: task.name,
                theoryText: task.theory,
                missionText: task.mission,
                languages: task.languages,
            })
        }
    }

    render() {
        return(
            <CreateTask isTeacher={this.props.isTeacher}
                        isChange={this.props.isChange}
                        handleUpdate={this.handleUpdate}
                        updateTests={this.updateTests}
                        handleSubmit={this.handleSubmit}
                        handleDelete={this.handleDelete}
                        addTest={this.addTest}
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
        isTeacher: state.auth.isTeacher,
        task: state.sprintPage.task
    }
}

export default connect(mapStateToProps,{getSprints,SendTask,updateTask,getTask,deleteTask})(WithCreateTaskUrl)