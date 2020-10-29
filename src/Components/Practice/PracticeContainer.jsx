import React from 'react';
import {connect} from "react-redux";
import Practice from "./Practice";
import {getTask} from "../../redux/sprint-reducer";

class PracticeContainer extends React.Component{

    render() {
        debugger
        return(
            <div>
                <Practice correctness={this.props.correctness} code={this.props.code} tests={this.props.tests}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        // correctness: state.sprintPage.task.correctness,
        code: state.sprintPage.task.task_detail[0].last_code,
        // tests: state.sprintPage.task.tests,

    }
}

export default connect(mapStateToProps, {getTask})(PracticeContainer)