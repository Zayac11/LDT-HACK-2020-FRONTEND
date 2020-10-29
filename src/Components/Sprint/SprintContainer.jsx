import React from 'react';
import {connect} from "react-redux";
import Sprint from "./Sprint";
import {getSprints} from "../../redux/sprint-reducer";

class SprintContainer extends React.Component{
    componentDidMount() {
        this.props.getSprints()
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
        className: state.sprintPage.className
    };
}

export default connect(mapStateToProps,{getSprints})(SprintContainer)