import React from 'react';
import {connect} from "react-redux";
import Sprint from "./Sprint";

class SprintContainer extends React.Component{
    render() {
        return(
            <>
                <Sprint {...this.props}/>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {

    };
}

export default connect(mapStateToProps,{})(SprintContainer)