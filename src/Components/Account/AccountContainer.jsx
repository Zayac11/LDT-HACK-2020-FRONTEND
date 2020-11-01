import React from "react";
import Account from "./Account";
import {connect} from "react-redux";
import {updatePassword} from "../../redux/account-reducer";

class AccountContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPassword: "",
            newPassword: "",
            repeatPassword: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit() {
        debugger
        updatePassword(this.state.oldPassword, this.state.newPassword, this.state.repeatPassword)
    }


    render() {
        return(
            <Account data={this.props.data} handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        data: state.accountPage.data
    }
}

export default connect(mapStateToProps, {updatePassword})(AccountContainer)