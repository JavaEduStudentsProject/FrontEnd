import React from 'react';

const Scroll = (props) => {
    return(
        <div style={{overflowY: 'scroll', height:'67vh'}}>
            {props.children}
        </div>
    );
}

export default Scroll;