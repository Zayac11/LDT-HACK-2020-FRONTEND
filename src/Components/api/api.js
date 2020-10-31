export const authAPI = {
    login(requestOptions) {

        return (
            fetch("http://127.0.0.1:8000/auth/jwt/create/", requestOptions)
                .then(response => response.json())
        )
    },
    getClasses(requestOptions) { //Метод для показа всех доступных классов

        return(
            fetch('http://127.0.0.1:8000/api/my_classes', requestOptions)
                .then(response => response.json())
        )
    }
}

export const taskAPI = {
    getTask(requestOptions,taskId){
        return fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, requestOptions)
            .then(response => response.json())
    },
    sendCode(requestOptions, taskId) {
        return fetch(`http://127.0.0.1:8000/api/tasks/${Math.floor(taskId)}/send_code`, requestOptions)
            .then(response => {
                // response.json()
                console.log(response)
                console.log((response.json()))
            })
    }
}

export const sprintAPI = {
    getSprints(requestOptions, sprintId){
        return fetch(`http://127.0.0.1:8000/api/classes/${sprintId}/`, requestOptions)
            .then(response => response.json())
    },
    // updateSprintName() {
    //
    // },
    addSprint(requestOptions, classId) {
        return fetch(`http://127.0.0.1:8000/api/classes/${classId}/new_block`, requestOptions)
            .then(response => response.json())
    }

}
