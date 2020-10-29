import React from 'react';
import {connect} from "react-redux";
import Practice from "./Practice";

class PracticeContainer extends React.Component{
    render() {
        return(
            <div>
                <Practice correctness={this.props.correctness} />
            </div>
        )
    }

}

let mapStateToProps = (state) => {
    return {
        correctness: state.sprintPage.task.correctness
    }
}

export default connect(mapStateToProps, {})(PracticeContainer)