import React from 'react';
import Cookies from 'js-cookie'

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
        const accessToken = 'JWT ' + Cookies.get('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);

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


