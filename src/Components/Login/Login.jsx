import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import s from './Login.module.css'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

    handleSubmit = () => {
           this.props.login(this.state.name, this.state.pass)
    }

    render() {
        return (
            <>
            {
                this.props.isLogin ?
                    <Redirect to="/my_classes" />
                    :
                    <div className={s.container}>
                        <div className={s.loginContainer}>
                            <h2 className={s.enter}>
                                Вход в систему
                            </h2>
                            <div className={s.field}>
                                <input placeholder={'Логин'} name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
                            </div>
                            <div className={s.field}>
                                <input placeholder={'Пароль'} name="pass" type="password" value={this.state.pass} onChange={this.handleInputChange} />
                            </div>
                            <div className={s.submit}>
                                <input type="submit" value="Войти" onClick={this.handleSubmit}/>
                            </div>



                        </div>
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