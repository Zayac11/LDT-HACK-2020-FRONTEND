import React from 'react';
import {Redirect, Route} from "react-router-dom";
import News from "../News";
import Textarea from "../Textarea";
import {connect} from "react-redux";
import NavbarContainer from "../Navbar/NavbarContainer";
import SprintContainer from "../Sprint/SprintContainer";

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
                            <Route path='/sprint' render={ () => <SprintContainer />} />
                            <Route path='/news' render={ () => <News />} />
                            <Route path='/textarea' render={ () => <Textarea />} />
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


