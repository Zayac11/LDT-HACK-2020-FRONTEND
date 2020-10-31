import {authAPI} from "../Components/api/api";
import Cookies from "js-cookie";

const SET_AUTH = 'SET_AUTH';
const SET_CLASS_DATA = 'SET_CLASS_DATA';
const SET_INITIALIZED = 'SET_INITIALIZED';
const SET_TEACHER = 'SET_TEACHER';

let initialState = {
    isLogin: false, //Нужно будет поменять на false
    classData: [],
    isInitialized: false,
    isTeacher: true,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH: //Залогинен ли пользователь
            return {
                ...state,
                isLogin: action.isLogin,
            }
        case SET_INITIALIZED: //Инициализировалось ли приложение
            return {
                ...state,
                isInitialized: true,
            }
        case SET_TEACHER: //Является ли пользователь учителем
            return {
                ...state,
                isTeacher: true,
            }
        case SET_CLASS_DATA: //Установка информации о классах
            return {
                ...state,
                classData: [...action.classData]
            }

        default:
            return state;
    }
}

export const setClassData = (classData) => ({type: SET_CLASS_DATA, classData})
export const setAuth = (isLogin) => ({type: SET_AUTH, isLogin})
export const setInitialized = () => ({type: SET_INITIALIZED})
export const setTeacher = (isTeacher) => ({type: SET_CLASS_DATA, isTeacher})


const getOptions = (username, password) => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    return requestOptions
}

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

export const login = (username, password) => {
    return async (dispatch) => {
        let response = await authAPI.login(getOptions(username, password))
        Cookies.set('accessToken', response.access, { expires: 7 })
        dispatch(setAuth(true))
    }
}
export const logout = () => {
    return async (dispatch) => {
        Cookies.remove('accessToken')
        dispatch(setAuth(false))
    }
}

export const initialized = () => {
    return async (dispatch) => {
        let response = await authAPI.getClasses(getHeaders())
        console.log(response)
        if(!response.code) {
            dispatch(setAuth(true))
            dispatch(setClassData(response))
        }
        dispatch(setInitialized())
    }
}

export const getClass = () => {
    return async (dispatch) => {
        let response = await authAPI.getClasses(getHeaders())
        console.log(response)
        dispatch(setClassData(response))
    }
}

export default authReducer