import React from 'react';
import {connect} from "react-redux";
import Theory from "./Theory";

class TheoryContainer extends React.Component{
    render() {
        return(
            <div>
                <Theory theory={this.props.theory} tests={this.props.tests} />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        theory: state.sprintPage.task.theory,
        tests: state.sprintPage.task.tests
    }
}

export default connect(mapStateToProps, {})(TheoryContainer)