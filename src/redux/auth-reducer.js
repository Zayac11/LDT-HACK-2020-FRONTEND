import {authAPI} from "../Components/api/api";
import Cookies from "js-cookie";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH = 'SET_AUTH';
const SET_CLASS_DATA = 'SET_CLASS_DATA';

let initialState = {
    isLogin: true, //Нужно будет поменять на false
    classData: [],
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case SET_AUTH:
            return {
                ...state,
                isLogin: action.isLogin,
            }
        case SET_CLASS_DATA:
            return {
                ...state,
                classData: [...action.classData]
            }

        default:
            return state;
    }
}

export const setAuthUserData = (isLogin) => ({type: SET_USER_DATA, payload: {isLogin: isLogin}})
export const setAuth = (isLogin) => ({type: SET_USER_DATA, payload: {isLogin: isLogin}})
export const setClassData = (classData) => ({type: SET_CLASS_DATA, classData})

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
        // console.log(response)
        Cookies.set('accessToken', response.access, { expires: 7 })
        dispatch(setAuthUserData(true))
    }
}
export const logout = () => {
    return async (dispatch) => {
        Cookies.remove('accessToken')
        dispatch(setAuthUserData(false))
    }
}

export const initialized = () => {
    return async (dispatch) => {
        let response = await authAPI.getClasses(getHeaders())
        console.log(response)
        if(response.code) {
            dispatch(setAuth(false))
        }
        dispatch(setClassData(response))
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