import React from 'react';
import classes from "./MyInput.module.css"

// Закомментированные строки нужны для неконтролируемого компонента input
// const MyInput = React.forwardRef((props, ref) => {
const MyInput = (props) => {
    return (
        // <input ref={ref} className={classes.myInput} {...props} />
        <input className={classes.myInput} {...props} />

    );
};

export default MyInput;