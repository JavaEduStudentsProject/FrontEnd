import React, {useState} from 'react';

import StarRating from "./StarRating";


const ShortProductDescription = (props) => {
    return (
        <div className="short-descr">
            <StarRating/>
        </div>
    );
};

export default ShortProductDescription;