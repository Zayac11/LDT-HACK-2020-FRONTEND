import React from 'react';
import {withRouter, Redirect} from "react-router-dom";
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
                id: 0,
            },],
            languages: [],
            timeLimit: "",
            memoryLimit: "",
            isChange: false,
            allTests:[],
            isChangeDone: false
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

    updateTests(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const id = Math.floor(target.id)

        id < 3 ?
        this.setState({
            tests: this.state.tests.map(test => test.id === id ?
            ({
                ...test,
                [name]: value,
                is_visible: true
            }):{...test})
        }):
        this.setState({
            tests: this.state.tests.map(test => test.id === id ?
                ({
                    ...test,
                    [name]: value,
                    is_visible: false
                }):{...test})
        })

    }

    addTest(event) {
        const target = event.target;

        this.setState({
            tests: [...this.state.tests, {
                question: "",
                answer: "",
                is_visible: false,
                id: this.state.tests.length,
            }]
        })

    }

    handleSubmit() { // Создать/изменить таск
        console.log(this.state)
        console.log(this.state.allTests)

        if(this.state.isChange) {
            this.props.updateTask(this.state.taskName, Math.floor(this.state.sprintId), this.state.theoryText, this.state.missionText,
                this.state.tests, this.state.languages, this.state.timeLimit, this.state.memoryLimit)
        }
        else {
            this.props.SendTask(this.state.taskName, this.state.theoryText, this.state.missionText,
                this.state.tests, Math.floor(this.state.sprintId), this.state.languages, this.state.timeLimit, this.state.memoryLimit)
        }

        this.setState({
            isChangeDone: true
        })
    }

    handleDelete() {
        this.props.deleteTask(Math.floor(this.state.sprintId)) //В данном случае, это id ТАСКА, а не его спринта
        //После делета можно сделать гет запрос за новым спринтом
        this.setState({
            isChangeDone: true
        })
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

        // debugger
        // this.props.isChange &&
        //     this.setState({
        //         taskName: this.props.task.name,
        //     })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if((prevProps.task.length === 0 && this.props.task.task )|| (prevProps.task.task !== this.props.task.task)) {
            debugger
            const task = this.props.task.task
            this.setState({
                taskName: task.name,
                theoryText: task.theory,
                missionText: task.mission,
                tests: this.props.task.tests,
            })
        }
    }

    render() {
        return(
            this.state.isChangeDone
            ? <Redirect to={'/my_classes'} />
            : <CreateTask isTeacher={this.props.isTeacher}
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