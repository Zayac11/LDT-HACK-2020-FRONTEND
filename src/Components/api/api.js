import * as axios from "axios";

let instance = axios.create({
    // withCredentials: true,
    // baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    baseURL: 'http://127.0.0.1:8000/',
    // headers: {
    //     "API-KEY": '3c506123-7591-4f5d-a26a-91140af2545a'
    // }
})

export const authAPI = {
    login(requestOptions) {
        return (
            fetch("http://127.0.0.1:8000/auth/jwt/create/", requestOptions)
                .then(response => response.json())
        )
    },
    initialize(requestOptions) {
        return (
            fetch("http://127.0.0.1:8000/api/my_classes", requestOptions)
                .then(response => response.json())
        )
    },
    ass(requestOptions) {
        return(
            fetch('http://127.0.0.1:8000/api/my_classes', requestOptions)
                .then(response => response.json())
        )
    },
    sass(requestOptions) {
        return(
            fetch('http://127.0.0.1:8000/api/classes/4/', requestOptions)
                .then(response => {
                    debugger
                    response.json()
                })
        )
    }
}
export const taskAPI = {

}
export const sprintAPI = {
    getSprints(){
        return instance.get('api/course/')
    },
    getTask(taskId){
        return instance.get(`api/task/${taskId}/`)
    }
}
