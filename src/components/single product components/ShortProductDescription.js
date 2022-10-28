import React, {useState} from 'react';
import MainCharacteristics from "./MainCharacteristics";
import StarRating from "./StarRating";
import Row from "../all products components/Row";

const ShortProductDescription = (props) => {

    return (
        <div className="short-descr">
            <StarRating/>
        </div>
    );
};

export default ShortProductDescription;