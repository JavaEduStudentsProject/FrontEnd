import React from 'react';
import {Link} from "react-router-dom";

const Category = (props)=>{
    return(
        <Link  to = {`/${props.category}`} >{props.category}</Link>
    )
}
export default Category;