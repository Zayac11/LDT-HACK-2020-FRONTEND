import React from 'react';
import {connect} from "react-redux";
import Practice from "./Practice";
import {getTask, sendCode} from "../../redux/sprint-reducer";
import {withRouter} from "react-router-dom";

class PracticeContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            code: "",
            task_detail: [],
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

        this.props.sendCode("cpp","1000", this.props.match.params.id, this.state.code) //Нужно поменять на выбранный код
        this.setState({
            code: ""
        })
    }

    componentDidMount() {

        this.setState({
            task_detail: [{
                is_done: false,
                last_code: "",
            }],
        })
    }

    render() {
        return(
            <div>
                <Practice code={this.state.code} handleSubmit={this.handleSubmit} task_detail={this.state.task_detail}
                          handleChange={this.handleChange} tests={this.props.tests} task={this.props.task}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        task: state.sprintPage.task,
        tests: state.sprintPage.tests,
    }
}

let WithPracticeUrl = withRouter(PracticeContainer);

export default connect(mapStateToProps, {getTask, sendCode})(WithPracticeUrl)