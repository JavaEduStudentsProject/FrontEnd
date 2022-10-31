import React from 'react';

const Scroll_Horizontal = (props) => {
    return(
        <div style={{overflowX: 'scroll', height:'auto'}}>
            {props.children}
        </div>
    );
}

export default Scroll_Horizontal;