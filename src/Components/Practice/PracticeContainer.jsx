import React from 'react';
import {connect} from "react-redux";
import Practice from "./Practice";
import {getTask, sendCode, sendFile} from "../../redux/sprint-reducer";
import {withRouter} from "react-router-dom";

class PracticeContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            code: "",
            currentLanguage: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.changeCurrentLanguage = this.changeCurrentLanguage.bind(this)
        this.handleFile = this.handleFile.bind(this)
    }

    handleChange(event) {
        debugger
        this.setState({
            code: event.code
        })

    }
    handleFile(event) {
        if(event.target.files.length) {
            sendFile(this.state.currentLanguage,"1000", this.props.match.params.id, event.target.files[0])
        }
    }
    changeCurrentLanguage(event) {

        this.setState({
            currentLanguage: event.target.value
        })
    }

    handleSubmit(code) {
        this.setState({
            code: code
        })

        console.log(this.state)

        this.props.sendCode(this.state.currentLanguage,"1000", this.props.match.params.id, this.state.code) //Нужно поменять на выбранный код
        this.setState({
            code: ""
        })
    }

    componentDidMount() {

        this.setState({
            currentLanguage: this.props.task.task.languages[0],
            code: this.props.task.task.task_detail[0].last_code
        })
    }

    render() {
        return(
            <div>
                <Practice code={this.state.code} handleSubmit={this.handleSubmit}
                          handleChange={this.handleChange} tests={this.props.tests} task={this.props.task} handleFile={this.handleFile}
                          changeCurrentLanguage={this.changeCurrentLanguage}
                />
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

export default connect(mapStateToProps, {getTask, sendCode, sendFile})(WithPracticeUrl)