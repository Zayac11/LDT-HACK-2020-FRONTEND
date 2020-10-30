import React from 'react';
import {connect} from "react-redux";
import Sprint from "./Sprint";
import {addSprint, getSprints} from "../../redux/sprint-reducer";
import {withRouter} from "react-router-dom";

class SprintContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sprintText: ""
        }

        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);

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
        this.props.addSprint(this.state.sprintText, this.props.sprints.length + 1)
        this.setState({
            sprintText: ""
        })
    }
    componentDidMount() {
        let sprintId = this.props.match.params.id //id класса, а не спринта
        this.props.getSprints(sprintId)

    }

    render() {
        return(
            <>
                <Sprint {...this.props} id={this.props.match.params.id}
                        handleUpdate={this.handleUpdate}
                        sprintText={this.state.sprintText}
                        handleSubmit={this.handleSubmit}
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

export default connect(mapStateToProps,{getSprints, addSprint})(WithSprintUrl)