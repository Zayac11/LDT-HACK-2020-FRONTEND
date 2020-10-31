import {sprintAPI, taskAPI} from "../Components/api/api";
import Cookies from "js-cookie";
import {setAuth} from "./auth-reducer";

const SET_SPRINTS = 'SET_SPRINTS'
const SET_TASK = 'SET_TASK'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const ADD_TASK = 'ADD_TASK'
const UPDATE_TASK = 'UPDATE_TASK'
const DELETE_TASK = 'DELETE_TASK'
const DELETE_SPRINT = 'DELETE_SPRINT'
const CHANGE_SPRINT_NAME = 'CHANGE_SPRINT_NAME'
const SET_TESTS = 'SET_TESTS'

let initialState = {
    name: "",
    sprints: [],
    isFetching: true,
    task:[],
    tests: [
    // {
    //     error: "task_Start: execv(1): /home/ejudge/solves/5/131/in 0<input.txt↵Status: OK↵CPUTime: 2↵RealTime: 3↵VMSize: 442368↵",
    //     status: true,
    //     test_num: 0,
    // },
    // {
    //     error: "task_Start: execv(1): /home/ejudge/solves/5/131/in 0<input.txt↵Status: OK↵CPUTime: 2↵RealTime: 3↵VMSize: 442368↵",
    //     status: true,
    //     test_num: 0,
    // },
    // {
    //     error: "task_Start: execv(1): /home/ejudge/solves/5/131/in 0<input.txt↵Status: OK↵CPUTime: 2↵RealTime: 3↵VMSize: 442368↵",
    //     status: true,
    //     test_num: 0,
    // },
    // {
    //     error: "task_Start: execv(1): /home/ejudge/solves/5/131/in 0<input.txt↵Status: OK↵CPUTime: 2↵RealTime: 3↵VMSize: 442368↵",
    //     status: true,
    //     test_num: 0,
    // },
    // {
    //     error: "task_Start: execv(1): /home/ejudge/solves/5/131/in 0<input.txt↵Status: OK↵CPUTime: 2↵RealTime: 3↵VMSize: 442368↵",
    //     status: true,
    //     test_num: 0,
    // },
    // {
    //     error: "task_Start: execv(1): /home/ejudge/solves/5/131/in 0<input.txt↵Status: OK↵CPUTime: 2↵RealTime: 3↵VMSize: 442368↵",
    //     status: true,
    //     test_num: 0,
    // },
    // {
    //     error: "task_Start: execv(1): /home/ejudge/solves/5/131/in 0<input.txt↵Status: OK↵CPUTime: 2↵RealTime: 3↵VMSize: 442368↵",
    //     status: true,
    //     test_num: 0,
    // },
    ],
}


const sprintReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_SPRINTS:
            return {
                ...state,
                name: action.name,
                sprints: [...action.sprints]
            }
        case SET_TASK:
            return {
                ...state,
                task: action.task,
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetch,
            }
        case ADD_TASK:
            let newTask = {
                id: action.taskId,
                name: action.taskName,
                task_detail: [{
                    id: 1,
                    is_done: false,
                    last_code: ""
                }]
            }
            return {
                ...state,
                sprints: state.sprints.map(s => action.sprintId === s.id ? //мапаем массив спринтов и ищем совпадение по айдишнику
                (s.tasks ?
                    {
                    ...s, //делаем копию нужного объекта
                    tasks: [...s.tasks, newTask] //делаем копию массива тасков у спринта и дописываем ему еще один таск
                }:{
                    ...s,
                        tasks: [newTask]
                    })
                : ({
                    ...s //иначе просто делаем копию объекта, без изменений
                }) )
            }
        case DELETE_TASK:
            return {
                ...state,
                sprints: state.sprints.map(s =>
                        ({
                            ...s,
                            tasks: s.tasks.filter((d) => {
                                return d.id !== action.taskId
                                }
                            )
                        })
                )
            }
        case DELETE_SPRINT:
            return {
                ...state,
                sprints: state.sprints.filter((d)=> {
                    return d.id !== action.sprintId
                })

            }
        case SET_TESTS:
            return {
                ...state,
                tests: action.tests

            }
        case CHANGE_SPRINT_NAME:
            return {
                ...state,
                sprints: state.sprints.map(s => action.sprintId === s.id ?
                {
                    ...s,
                    name: action.sprintName
                } :
                {
                   ...s
                }
                )

            }
        case UPDATE_TASK:
            let changedTask = {
                id: action.taskId,
                name: action.taskName,
                languages: [...action.languages],
                task_detail: [{
                    id: action.taskId,
                    is_done: false,
                    last_code: ""
                }],
                theory: action.theoryText,
                mission: action.missionText
            }
            return {
                ...state,
                task: changedTask
            }
        default:
            return state;
    }
}

export const setSprints = (sprints, name) => ({type: SET_SPRINTS, sprints, name })
export const setTask = (task) => ({type: SET_TASK, task})
export const toggleIsFetching = (isFetch) => ({type: TOGGLE_IS_FETCHING, isFetch})
export const addTask = (taskName, taskId, sprintId) => ({type: ADD_TASK, taskName, taskId, sprintId})
export const changeTask = (taskName, taskId, theoryText, missionText, languages) => ({type: UPDATE_TASK, taskName, taskId, theoryText, missionText, languages})
export const removeTask = (taskId) => ({type: DELETE_TASK, taskId})
export const setTests = (tests) => ({type: SET_TESTS, tests})
export const removeSprint = (sprintId) => ({type: DELETE_SPRINT, sprintId})
export const changeSprintName = (sprintName, sprintId) => ({type: CHANGE_SPRINT_NAME, sprintName, sprintId})
// export const sendPracticeCode = () => ({type: SEND_CODE})

const getToken = () => {
    const accessToken = 'Bearer  ' + Cookies.get('accessToken')
    let myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/json");
    return myHeaders
}

const getHeaders = (method) => {

    let requestOptions = {
        method: method,
        headers: getToken(),
        redirect: 'follow'
    };
    return requestOptions
}

export const getSprints = (classId) => {
    return async (dispatch) => {
        let response = await sprintAPI.getSprints(getHeaders('GET'), classId)
            console.log(response)
            if(response.sprints) {
                dispatch(setSprints(response.sprints, response.name))
            }
            else {
                window.alert('У вас нет доступа к курсам данного класса')
                Cookies.remove('accessToken')
                dispatch(setAuth(false))
            }
    }
}
export const addSprint = (sprintName, classId) => {

    let formdata = new FormData();
    formdata.append("name", sprintName)
    formdata.append("grade", classId)

    let requestOptions = {
        method: 'POST',
        body: formdata,
        headers: getToken(),
        redirect: 'follow'
    };

    return (dispatch) => {
        sprintAPI.addSprint(requestOptions, Math.floor(classId))
            .then(response => {
                response.ok &&
                dispatch(getSprints(Math.floor(classId)))
            })
    }
}

export const getTask = (taskId) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        taskAPI.getTask(getHeaders('GET'), taskId)
            .then(response => {
                console.log(response)
                dispatch(setTask(response))
                dispatch(toggleIsFetching(false))
            })
    }
}
//addTask
export const SendTask = (taskName, theoryText, missionText, tests, sprintId, languages, timeLimit, memoryLimit) => {

    const accessToken = 'Bearer  ' + Cookies.get('accessToken')
    let myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/json");
    debugger
    let data = JSON.stringify({
        "name": taskName,
        "theory": theoryText,
        "mission": missionText,
        "sprint": sprintId,
        "languages": languages.join(),
        "tests": tests,
    })
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };
    return async (dispatch) => {
        debugger
        await fetch(`http://127.0.0.1:8000/api/blocks/${sprintId}/new_task`, requestOptions)
    }
}
export const updateTask = (taskName, taskId, theoryText, missionText, tests, languages, timeLimit, memoryLimit) => {
    let data = JSON.stringify({
        "name": taskName,
        "theory": theoryText,
        "mission": missionText,
        "sprint": taskId,
        "languages": languages.join(),
        "tests": tests,
    })
    let requestOptions = {
        method: 'PUT',
        headers: getToken(),
        body: data,
        redirect: 'follow'
    };
    debugger
    return (dispatch) => {
        taskAPI.updateTask(requestOptions, taskId)
    }
}
export const deleteTask = (taskId) => {
    return (dispatch) => {
        taskAPI.deleteTask(getHeaders('DELETE'), taskId)
            .then(response => {
                if(response.ok) {
                    dispatch(removeTask(taskId))
                    // dispatch(getSprints())
                }
            })
    }
}
export const deleteSprint = (sprintId) => {
    return (dispatch) => {
        sprintAPI.deleteSprint(getHeaders('DELETE'), sprintId)
            .then(response => {
                response.ok &&
                dispatch(removeSprint(sprintId))
            })
    }
}
export const updateSprint = (sprintId, sprintName) => {
    let formdata = new FormData();
    formdata.append("name", sprintName)

    let requestOptions = {
        method: 'PUT',
        body: formdata,
        headers: getToken(),
        redirect: 'follow'
    };
    return (dispatch) => {
        sprintAPI.updateSprint(requestOptions, sprintId)
            .then(response => {
                response.ok &&
                dispatch(changeSprintName(sprintName, sprintId))
            })
    }
}


export const sendCode = (language, timeLimit = 1000, taskId, code) => {

    let formdata = new FormData();
    formdata.append("language", language);
    formdata.append("time_limit_millis", timeLimit);
    formdata.append("task_id", taskId);
    formdata.append("code", code);

    let requestOptions = {
        method: 'POST',
        headers: getToken(),
        body: formdata,
        redirect: 'follow'
    };

    return async (dispatch) => {
        console.log(language, timeLimit = 1000, taskId, code)
        await fetch(`http://127.0.0.1:8000/api/tasks/${Math.floor(taskId)}/send_code`, requestOptions)
            .then(
                result => result.json().then(
                    result => {
                        console.log(JSON.parse(result))
                        dispatch(setTests(JSON.parse(result).tests))
                    }
                ),
        )
    }
}




export default sprintReducer