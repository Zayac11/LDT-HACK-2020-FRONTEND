import React from 'react';
import {connect} from "react-redux";
import Sprint from "./Sprint";
import {getSprints} from "../../redux/sprint-reducer";
import {withRouter} from "react-router-dom";

class SprintContainer extends React.Component{
    componentDidMount() {

        let sprintId = this.props.match.params.id

        this.props.getSprints(sprintId)
    }

    render() {
        return(
            <>
                <Sprint {...this.props}/>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        sprints: state.sprintPage.sprints,
        classData: state.auth.classData,
    };
}

let WithSprintUrl = withRouter(SprintContainer);

export default connect(mapStateToProps,{getSprints})(WithSprintUrl)