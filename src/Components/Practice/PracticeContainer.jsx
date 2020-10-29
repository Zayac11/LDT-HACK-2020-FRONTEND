import React from 'react';
import {connect} from "react-redux";
import Practice from "./Practice";
import {getTask} from "../../redux/sprint-reducer";

class PracticeContainer extends React.Component{

    render() {
        return(
            <div>
                <Practice task={this.props.task}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        task: state.sprintPage.task,
    }
}

export default connect(mapStateToProps, {getTask})(PracticeContainer)