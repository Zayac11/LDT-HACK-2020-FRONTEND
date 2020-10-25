import React from 'react';
import './App.css';
import Register from "./Components/Register";
import {Route} from "react-router-dom";
import Textarea from "./Components/Textarea";
import Login from "./Components/Login";
import Post from "./Components/Post";

function App() {
    return (
        <div className="App">
            <Route path='/register' render={ () => <Register />} />
            <Route path='/login' render={ () => <Login />} />
            <Route path='/textarea' render={ () => <Textarea />} />
            <Route path='/post' render={ () => <Post />} />

            {/*<Register />*/}

        </div>
    );
}

export default App;
