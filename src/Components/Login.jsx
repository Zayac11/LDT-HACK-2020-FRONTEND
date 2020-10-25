import React from 'react';
import * as axios from "axios";
import DjangoCSRFToken from 'django-react-csrftoken'

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
            accessToken: ""
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

        let formdata = new FormData();
        formdata.append("username", this.state.name);
        formdata.append("password", this.state.pass);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            // redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/auth/jwt/create/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        // console.log(this.state.resultToken)
        // console.log(this.state.accessToken)

        // let axios = require('axios');
        // let FormData = require('form-data');
        // let data = new FormData();
        // data.append('username', this.state.name);
        // data.append('password', this.state.pass);
        //
        // let config = {
        //     method: 'post',
        //     url: 'http://127.0.0.1:8000/auth/jwt/create/',
        //     headers: {
        //         ...data.getHeaders()
        //     },
        //     data : data
        // };
        //
        // axios(config)
        //     .then(function (response) {
        //         console.log(JSON.stringify(response.data));
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }

    render() {
        return (
            <form>
                <DjangoCSRFToken />
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
                    <input type="submit" value="Войти" onClick={this.handleSubmit}/>
                </label>

            </form>
        )
    }
}

export default Login;


