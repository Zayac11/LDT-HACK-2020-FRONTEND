import React from 'react';
import {connect} from "react-redux";
import Theory from "./Theory";

class TheoryContainer extends React.Component{
    render() {
        return(
            <div>
                <Theory theory={this.props.theory} code={this.props.code} />
            </div>
        )
    }
}

let mapStateToProps = (state) => {

    return {
        theory: state.sprintPage.task.theory,
        code: state.sprintPage.task.theory,
    }
}

export default connect(mapStateToProps, {})(TheoryContainer)