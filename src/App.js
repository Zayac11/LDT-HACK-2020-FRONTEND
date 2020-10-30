import React from 'react';
import './App.css';
import Register from "./Components/Register";
import {Route, Switch} from "react-router-dom";
import Login from "./Components/Login";
import Container from "./Components/Container/Container";
import Main from "./Components/Main/Main";
import {connect} from "react-redux";
import {initialized} from "./redux/auth-reducer";
import Preloader from "./Common/Preloader/Preloader.jsx";

class App extends React.Component{

    componentDidMount() {
        this.props.initialized()
    }

    render() {
        if(!this.props.isInitialized) {
            return <Preloader />
        }
        return (
            <div className="App">

                <Switch>
                    <Route exact path='/' render={ () => <Main />} />
                    <Route exact path='/main' render={ () => <Main />} />
                    <Container  />
                </Switch>
                <Route exact path='/register' render={ () => <Register />} />
                <Route exact path='/login' render={ () => <Login />} />

            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin,
        isInitialized: state.auth.isInitialized,
    }
}

export default connect(mapStateToProps, {initialized})(App);
