import {sprintAPI, taskAPI} from "../Components/api/api";
import Cookies from "js-cookie";

const SET_SPRINTS = 'SET_SPRINTS'
const SET_TASK = 'SET_TASK'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const ADD_SPRINT = 'ADD_SPRINT'
const ADD_TASK = 'ADD_TASK'

let initialState = {
    name: "",
    sprints: [],
    isFetching: true,
    // sprints: [
    //     {   name: "Python",
    //         task:[{
    //
    //             id: 0,
    //             name: "Python1",
    //             status: true
    //
    //         },
    //         {
    //
    //             id: 1,
    //             name: "Python2",
    //             status: true
    //
    //         },
    //         {
    //
    //             id: 2,
    //             name: "Python3",
    //             status: false
    //
    //         }]
    //     },
    //     {   name: "C++",
    //         task:[{
    //
    //             id: 3,
    //             name: "C++1",
    //             status: true
    //
    //         },
    //         {
    //
    //             id: 4,
    //             name: "C++2",
    //             status: true
    //
    //         },
    //         {
    //
    //             id: 5,
    //             name: "C++3",
    //             status: false
    //
    //         }]
    //     },
    // ],
    task:[],
    // task: {
    //     id: 0,
    //     name: "Python1",
    //     status: true,
    //     theory: "Чтобы сделать то, надо здать теорию, теория, теория, тут теория",
    //     tests: [
    //         {
    //           input: "2 + 3",
    //           output: 5
    //         },
    //         {
    //           input: "22 + 32",
    //           output: 54
    //         },
    //     ],
    //     correctness: true,
    //     code: "function add(a, b) {↵    return a + b;↵}"
    // }
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
        case ADD_SPRINT:
            let newSprint = {
                id: action.sprintId,
                name: action.sprintName,
                task: []
            }
            return {
                ...state,
                sprints: [...state.sprints, newSprint],
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
        default:
            return state;
    }
}

export const setSprints = (sprints, name) => ({type: SET_SPRINTS, sprints, name })
export const setTask = (task) => ({type: SET_TASK, task})
export const toggleIsFetching = (isFetch) => ({type: TOGGLE_IS_FETCHING, isFetch})
export const addSprint = (sprintName, sprintId) => ({type: ADD_SPRINT, sprintName, sprintId})
export const addTask = (taskName, taskId, sprintId) => ({type: ADD_TASK, taskName, taskId, sprintId})

const getHeaders = () => {
    const accessToken = 'Bearer  ' + Cookies.get('accessToken')
    let myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return requestOptions
}

export const getSprints = (sprintId) => {
    return async (dispatch) => {
        let response = await sprintAPI.getSprints(getHeaders(), sprintId)
            console.log(response)
            dispatch(setSprints(response.sprints, response.name))
    }
}

export const getTask = (taskId) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        taskAPI.getTask(getHeaders(), taskId)
            .then(response => {
                console.log(response)
                dispatch(setTask(response))
                dispatch(toggleIsFetching(false))
            })
    }
}
export const SendTask = (taskName, taskId, theoryText, missionText, demoTests, tests, sprintId, languages, timeLimit, memoryLimit) => {
    return (dispatch) => {
        dispatch(addTask(taskName, taskId, sprintId))
    }
}



export default sprintReducer