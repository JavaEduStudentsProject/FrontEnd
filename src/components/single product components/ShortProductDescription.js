import React, {useState} from 'react';
import MainCharacteristics from "./MainCharacteristics";
import StarRating from "./StarRating";
import Row from "../all products components/Row";

const ShortProductDescription = (props) => {
    console.log(props.product)
    const keys = Object.keys(props.product["filter_features"]);
    console.log("Keys: " + keys);

    let descriptionList = keys.map((key, index) =>
        <li key={index}>
            {keys[index]}: {props.product["filter_features"][key]}
        </li>
    );


    return (
        <div className="short-descr">
            <h4>Короткое описание товара. Характеристики для фильтров</h4>
            <ul className="main-characts">
                {descriptionList}
            {/*{characteristics.map(characteristic =>*/}
            {/*    <MainCharacteristics characteristic = {characteristic} key={characteristic.id}/>*/}
            {/*)}*/}
            </ul>
            <StarRating/>
        </div>
    );
};

export default ShortProductDescription;