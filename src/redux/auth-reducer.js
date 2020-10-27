import {authAPI} from "../Components/api/api";
import Cookies from "js-cookie";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH = 'SET_AUTH';

let initialState = {
    isLogin: true,
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

        default:
            return state;
    }
}

export const setAuthUserData = (isLogin) => ({type: SET_USER_DATA, payload: {isLogin: isLogin}})
export const setAuth = (isLogin) => ({type: SET_USER_DATA, payload: {isLogin: isLogin}})

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

export const login = (username, password) => {
    return async (dispatch) => {
        let response = await authAPI.login(getOptions(username, password))
        console.log(response)
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
        const accessToken = 'JWT ' + Cookies.get('accessToken')
        let myHeaders = new Headers();
        myHeaders.append("Authorization", accessToken);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = await authAPI.initialize(requestOptions)
        console.log(response)
        if(response.code) {
            dispatch(setAuth(false))
        }
    }
}

export default authReducer