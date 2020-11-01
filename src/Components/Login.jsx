import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../redux/auth-reducer";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // isGoing: true,
            // numberOfGuests: 2,
            name: "",
            pass: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
           this.props.login(this.state.name, this.state.pass)
    }

    render() {
        return (
            <>
            {
                this.props.isLogin ?
                    <Redirect to="/my_classes" />
                    :
                    <div>

                        <label>
                            Имя:
                            <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
                        </label>
                        <br />
                        <label>
                            Пароль:
                            <input name="pass" type="password" value={this.state.pass} onChange={this.handleInputChange} />
                        </label>
                        <label>
                            <input type="submit" value="Отправить" onClick={this.handleSubmit}/>
                        </label>

                    </div>
            }
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        isLogin: state.auth.isLogin
    }
}

export default connect(mapStateToProps,{login})(Login);