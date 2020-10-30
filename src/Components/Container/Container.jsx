import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import NavbarContainer from "../Navbar/NavbarContainer";
import SprintContainer from "../Sprint/SprintContainer";
import Textarea from "../Textarea";
import TaskContainer from "../Task/TaskContainer";
import Footer from "../Footer/Footer";
import MyClasses from "../MyClasses/MyClasses";
import Error404 from "../404/Error404";

class Container extends React.Component {

    render() {
        return (
            <>
                {
                    !this.props.isLogin ?
                        <Redirect to="/login" />
                        :
                        <>
                            <NavbarContainer />
                            <Switch>
                                <Route exact path='/course/:id' render={ () => <SprintContainer />} />
                                <Route path='/my_classes' render={ () => <MyClasses />} />
                                <Route path='/textarea' render={ () => <Textarea />} />
                                <Route path='/task/:id' render={ () => <TaskContainer />} />
                                <Route path='*' render={ () => <Error404 />} />
                            </Switch>
                            <Footer />
                        </>
                }
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isLogin: state.auth.isLogin
    };
}

export default connect(mapStateToProps, {})(Container)



