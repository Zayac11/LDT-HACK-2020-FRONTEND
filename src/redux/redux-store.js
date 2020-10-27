import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import sprintReducer from "./sprint-reducer";
import authReducer from "./auth-reducer";
import accountReducer from "./account-reducer";
import taskReducer from "./task-reducer";


let reducers = combineReducers({
    sprintPage: sprintReducer, // страница спринтов
    auth: authReducer, //auth - аутентификация
    accountPage: accountReducer, //account - страница аккаунта
    taskPage: taskReducer, //task - страница задания
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;