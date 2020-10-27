import React from 'react';
import './App.css';
import Register from "./Components/Register";
import {Route} from "react-router-dom";
import Login from "./Components/Login";
import Container from "./Components/Container/Container";
import Main from "./Components/Main/Main";
import {connect} from "react-redux";
import {initialized} from "./redux/auth-reducer";

class App extends React.Component{

    componentDidMount() {
        this.props.initialized()
    }

    render() {
        return (
            <div className="App">
                <Route exact path='/' render={ () => <Main />} />
                <Route exact path='/main' render={ () => <Main />} />
                <Route exact path='/register' render={ () => <Register />} />
                <Route exact path='/login' render={ () => <Login />} />
                <Container  />
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin
    }
}

export default connect(mapStateToProps, {initialized})(App);
