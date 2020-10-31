import React from 'react';
import {connect} from "react-redux";
import Sprint from "./Sprint";
import {addSprint, deleteSprint, getSprints, updateSprint} from "../../redux/sprint-reducer";
import {withRouter} from "react-router-dom";

class SprintContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sprintText: "",
            editMode: false,
            sprintName: "",
            mutableSprintId: ""
        }

        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteSprint = this.handleDeleteSprint.bind(this);
        this.handleChangeSprintName = this.handleChangeSprintName.bind(this);
        this.activateEditMode = this.activateEditMode.bind(this);
        this.deactivateEditMode = this.deactivateEditMode.bind(this);

    }

    activateEditMode = (event) => {
        this.setState( {
            editMode: true,
            mutableSprintId: Math.floor(event.target.id)
        } );
    }
    deactivateEditMode = (event) => {
        const sprintId = Math.floor(event.target.id)
        this.setState( {
            editMode: false
        } );
        this.props.updateSprint(sprintId, this.state.sprintName)
    }

    handleUpdate(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit() {
        this.props.addSprint(this.state.sprintText, this.props.sprints.length + 1) //Отсылаем на сервер и в гет запросе получаем новый id для отображения и перехода
        this.setState({
            sprintText: ""
        })
    }
    handleDeleteSprint(event) {
        const sprintId = event.target.id
        this.props.deleteSprint(Math.floor(sprintId))
        this.setState({
            editMode: false
        })
    }
    handleChangeSprintName(event) {

    }
    componentDidMount() {
        let sprintId = this.props.match.params.id //id класса, а не спринта
        if(!this.props.sprints.length > 0) { //Если спринты не подгрузились, то вызываем функцию для вызова отсюда
            this.props.getSprints(sprintId)
        }
    }

    render() {
        return(
            <>
                <Sprint {...this.props} id={this.props.match.params.id}
                        handleUpdate={this.handleUpdate}
                        sprintText={this.state.sprintText}
                        editMode={this.state.editMode}
                        mutableSprintId={this.state.mutableSprintId}
                        handleSubmit={this.handleSubmit}
                        handleDeleteSprint={this.handleDeleteSprint}
                        activateEditMode={this.activateEditMode}
                        deactivateEditMode={this.deactivateEditMode}
                />
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        sprints: state.sprintPage.sprints,
        classData: state.auth.classData,
        isTeacher: state.auth.isTeacher,
    };
}

let WithSprintUrl = withRouter(SprintContainer);

export default connect(mapStateToProps,{getSprints, addSprint, deleteSprint, updateSprint})(WithSprintUrl)