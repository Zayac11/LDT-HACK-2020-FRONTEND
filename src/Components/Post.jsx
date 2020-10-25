import React from 'react';
import Cookies from 'js-cookie'
import {Redirect} from "react-router-dom";

class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLogin: true
        };

        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        const accessToken = 'JWT ' + Cookies.get('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/demosnews/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.code) {
                    this.setState({
                        isLogin: false
                    })
                }
            })
            .catch(error => console.log('error', error))
    }

    // handleInputChange(event) {
    //
    // }
    //
    handleLogout = () => {
        Cookies.remove('accessToken')
        this.setState({
            isLogin: false
        })
    }

    render() {
        return (
            <>
                {
                    !this.state.isLogin ?
                        <Redirect to="login" />
                        :
                        <div>
                            Я залогинен получается
                            <button onClick={this.handleLogout}>Logout</button>
                        </div>
                }
            </>
        )
    }
}

export default Post;


