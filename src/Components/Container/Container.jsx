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
import CreateTaskContainer from "../CreateTask/CreateTaskContainer";
import UpdateTaskContainer from "../CreateTask/UpdateTaskContainer";
import {getClass, setTeacherStatus} from "../../redux/auth-reducer";
import {getUserInfo} from "../../redux/account-reducer";
import AccountContainer from "../Account/AccountContainer";

class Container extends React.Component {

    componentDidMount() {
        debugger
        this.props.setTeacherStatus()
        this.props.getUserInfo()
    }

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
                                <Route path='/create_task/:id' render={ () => <CreateTaskContainer />} />
                                <Route path='/update_task/:id' render={ () => <UpdateTaskContainer />} />
                                <Route path='/account' render={ () => <AccountContainer />} />
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
        isLogin: state.auth.isLogin,
        classData: state.auth.classData
    };
}

export default connect(mapStateToProps, {setTeacherStatus, getUserInfo, getClass})(Container)



