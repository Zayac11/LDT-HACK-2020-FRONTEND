import React from 'react';
import * as axios from "axios";
import DjangoCSRFToken from 'django-react-csrftoken'
import {Redirect} from "react-router-dom";
import Cookies from 'js-cookie'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// let instance = axios.create({
//     // withCredentials: true,
//     baseURL: 'http://127.0.0.1:8000',
//
// })

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // isGoing: true,
            // numberOfGuests: 2,
            name: "",
            pass: "",
            refreshToken: "",
            accessToken: "",
            isLogin: false
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

    handleSubmit = async (event) => {
        // alert('Отправленное имя: ' + this.state.name + '\n' + 'Password: ' + this.state.pass);

        let formdata = new FormData();
        formdata.append("username", this.state.name);
        formdata.append("password", this.state.pass);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        await fetch("http://127.0.0.1:8000/auth/jwt/create/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                this.setState({
                    refreshToken: result.refresh,
                    accessToken: result.access,
                    isLogin: true,
                })
                Cookies.set('accessToken', result.access)
            })
            .catch(error => console.log('error', error));

        // event.preventDefault();
    }

    render() {
        return (
            <>
            {
                this.state.isLogin ?
                    <Redirect to="post" />
                    :
                    // <DjangoCSRFToken/>
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

export default Login;