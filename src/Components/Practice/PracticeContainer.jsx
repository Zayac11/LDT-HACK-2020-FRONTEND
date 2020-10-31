import React from 'react';
import {connect} from "react-redux";
import Practice from "./Practice";
import {getTask, sendCode} from "../../redux/sprint-reducer";
import {withRouter} from "react-router-dom";

class PracticeContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            code: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {

        this.setState({
            code: event.code
        })

    }

    handleSubmit(code) {
        this.setState({
            code: code
        })

        console.log(this.state)

        this.props.sendCode("cpp","1000", this.props.match.params.id, this.state.code)
        this.setState({
            code: ""
        })
    }

    componentDidMount() {
        this.setState({
            code: this.props.task.task_detail[0].last_code
        })
    }

    render() {
        return(
            <div>
                <Practice code={this.state.code} handleSubmit={this.handleSubmit} handleChange={this.handleChange} task={this.props.task}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        task: state.sprintPage.task,
    }
}

let WithPracticeUrl = withRouter(PracticeContainer);


export default connect(mapStateToProps, {getTask, sendCode})(WithPracticeUrl)