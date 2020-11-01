import Cookies from "js-cookie";
import {accountApi} from "../Components/api/api";
import {logout} from "./auth-reducer";

const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    data: {
        date_of_birth: "",
        email: "",
        first_name: "",
        id: "",
        last_name: "",
        middle_name: "",
        school: "",
    }

}

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return  {
                data: action.data
            }
        default:
            return state;
    }
}
export const setUserData = (data) => ({type: SET_USER_DATA, data})


export const getUserInfo = () => {

    const accessToken = 'Bearer  ' + Cookies.get('accessToken')
    let myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return (dispatch) => {
        accountApi.getUserData(requestOptions)
            .then(response =>{
                dispatch(setUserData(response.data))
            })
    }
}

export const updatePassword = (oldPassword, newPassword, reNewPassword) => {
    const accessToken = 'Bearer  ' + Cookies.get('accessToken')

    let myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA0ODA2MzE5LCJqdGkiOiI4Yzg3Nzk5OGU5M2E0NGQ4OTliNGNiZDRkNWY5NTVmOSIsInVzZXJfaWQiOjF9.zL3hT7V3FhcZIthsd9NCtjFARjlSYkBjVtDZaCbBtWY");


    // let myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    debugger

    let formdata = new FormData();
    formdata.append("new_password", "odasidiasodiasoi");
    formdata.append("re_new_password", "odasidiasodiasoi");
    formdata.append("current_password", "123");

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    //
    // fetch("http://127.0.0.1:8000/auth/users/set_password/", requestOptions)
    //     .then( response => {
    //         debugger
    //         // response.ok &&
    //             // logout()
    //     })
    //

}

export default accountReducer