import React from 'react';
import {setSs} from "../redux/auth-reducer";
import {connect} from "react-redux";

class Myclass extends React.Component{

    componentDidMount() {
        this.props.setSs()
    }

    render() {
        return(
            <div>
                Joma
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return{

    }
}

export default connect(mapStateToProps,{setSs})(Myclass)