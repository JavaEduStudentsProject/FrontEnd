import React from 'react';
// import img from "../../images/img_4.png";

const ProductCard = (props) => {
    let newObj = {};

    function recursiveSearch(obj) {
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'object') {
                recursiveSearch(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        })
        return newObj;
    }
    const properties = recursiveSearch(props.item);
    const keys = Object.keys(properties).filter(key => key != "image" && key != "description");

    const descriptionList = keys.map((key, index) =>
        <li key={properties.id + index}>{keys[index]}: {properties[key]}</li>
    );

    return (
        <div className="product-card">
            <img className="preview" src={properties.image}/>
            {/*<img className="preview" src={img}/>*/}
            <ul>
                {descriptionList}
            </ul>
        </div>
    );
};

export default ProductCard;