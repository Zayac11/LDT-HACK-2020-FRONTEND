import React from 'react';
import * as axios from "axios";

class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjAzNzEwMDA0LCJqdGkiOiIwNTNhMzdmNjc4NWQ0ZmY1YWQ5YjYyYjEwOWM0YjVkMyIsInVzZXJfaWQiOjN9.FQiY2b9AFnR5dWt66fP5OhMopEluh_tQ4dgGEd0eL_c");

        // let formdata = new FormData();

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            // body: formdata,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/demosnews/", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error))
    }

    handleInputChange(event) {

    }

    handleSubmit = async (event) => {

    }

    render() {
        return (
            <>
                <button onClick={this.handleSubmit}>Получить посты</button>
            </>
        )
    }
}

export default Post;


