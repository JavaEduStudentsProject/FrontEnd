import React, {useState} from 'react';
import Button from "react-bootstrap/Button";

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
                <li>Рейтинг: {props.product["non_filter_features"]["rating"]}</li>
            </ul>
            <div className="price">
                <h2>Цена: {props.product.price}</h2>
                <Button className="product-button" onClick={() =>
                    props.incrementProductCount(props.product.id)
                }>
                    В корзину</Button>

            </div>
        </div>
    );
};

export default ShortProductDescription;