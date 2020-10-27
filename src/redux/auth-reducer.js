import {authAPI} from "../Components/api/api";
import Cookies from "js-cookie";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    isLogin: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

export const setAuthUserData = (isLogin) => ({type: SET_USER_DATA, payload: {isLogin: isLogin}})

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

export default authReducer