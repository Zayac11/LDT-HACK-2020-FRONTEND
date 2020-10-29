import {sprintAPI} from "../Components/api/api";

const SET_SPRINTS = 'SET_SPRINTS'
const SET_TASK = 'SET_TASK'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
    className: "10Б",
    name: "",
    sprints: [],
    isFetching: false,
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
        default:
            return state;
    }
}

export const setSprints = (sprints, name) => ({type: SET_SPRINTS, sprints, name })
export const setTask = (task) => ({type: SET_TASK, task})
export const toggleIsFetching = (isFetch) => ({type: TOGGLE_IS_FETCHING, isFetch})

export const getSprints = () => {
    return (dispatch) => {
        sprintAPI.getSprints()
            .then(response => {
                // console.log(response)
                dispatch(setSprints(response.data.sprints, response.data.name))
            })

    }
}
export const getTask = (taskId) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        sprintAPI.getTask(taskId)
            .then(response => {
                console.log(response)
                dispatch(setTask(response.data))
                dispatch(toggleIsFetching(false))
            })
    }
}

export default sprintReducer