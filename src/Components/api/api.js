import * as axios from "axios";

export const authAPI = {
    login(requestOptions) {
        return (
            fetch("http://127.0.0.1:8000/auth/jwt/create/", requestOptions)
                .then(response => response.json())
                // .then(result => {
                //     console.log(result)
                //     Cookies.set('accessToken', result.access, { expires: 7 })
                //     this.setState({
                //         isLogin: true,
                //     })
                // })
                // .catch(error => console.log('error', error))
        )
    }
}
export const taskAPI = {

}
export const sprintAPI = {

}
