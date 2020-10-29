import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import NavbarContainer from "../Navbar/NavbarContainer";
import SprintContainer from "../Sprint/SprintContainer";
import Textarea from "../Textarea";
import TaskContainer from "../Task/TaskContainer";
import News from "../News";
import Footer from "../Footer/Footer";

class Container extends React.Component {

    render() {
        return (
            <>
                {
                    !this.props.isLogin ?
                        <Redirect to="login" />
                        :
                        <>
                            <NavbarContainer />
                            <Switch>
                                <Route exact path='/course' render={ () => <SprintContainer />} />
                                <Route path='/textarea' render={ () => <Textarea />} />
                                <Route path='/course/:id' render={ () => <TaskContainer />} />

                                <Route path='*' render={ () => <News />} />
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



