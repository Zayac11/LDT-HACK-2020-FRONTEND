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
        // alert('Отправленное имя: ' + this.state.name + '\n' + 'Password: ' + this.state.pass);

        // let formdata = new FormData();
        // formdata.append("username", this.state.name);
        // formdata.append("password", this.state.pass);
        //
        // let requestOptions = {
        //     method: 'POST',
        //     body: formdata,
        //     redirect: 'follow'
        // };
        //
        // await fetch("http://127.0.0.1:8000/auth/jwt/create/", requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         console.log(result)
        //         Cookies.set('accessToken', result.access, { expires: 7 })
        //         this.setState({
        //             isLogin: true,
        //         })
        //     })
        //     .catch(error => console.log('error', error));

        // event.preventDefault();

        this.props.login(this.state.name, this.state.pass)
    }

    render() {
        return (
            <>
            {
                this.props.isLogin ?
                    <Redirect to="course" />
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