import React from 'react';
// import img from "../../images/img_4.png";

const ProductCard = (props) => {
    console.log(props);
    console.log(props.product);
    const keys = Object.keys(props.product).filter(key => key != "preview");
    console.log("Keys: " + keys);

    const descriptionList = keys.map((key, index) =>
        <li key={props.product.id + index}>{keys[index]}: {props.product[key]}</li>
    );

    return (
        <div className="product-card">
            <img className="preview" src={props.product.preview}/>
            {/*<img className="preview" src={img}/>*/}
            <ul>
                {descriptionList}
            </ul>
        </div>
    );
};

export default ProductCard;