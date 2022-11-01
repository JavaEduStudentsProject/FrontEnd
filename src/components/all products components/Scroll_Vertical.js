import React from 'react';

const Scroll_Vertical = (props) => {
    return(
        <div style={{overflowY: 'scroll', height:'25vh'}}>
            {props.children}
        </div>
    );
}

export default Scroll_Vertical;