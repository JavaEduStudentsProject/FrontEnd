import React from 'react';
import {Link} from "react-router-dom";

const ProductsBySubCategory = (props) => {
    return(
        <Link to = {`/${props.category}/${props.subCategory}`}>{props.subCategory}</Link>
    )
};


export default ProductsBySubCategory;