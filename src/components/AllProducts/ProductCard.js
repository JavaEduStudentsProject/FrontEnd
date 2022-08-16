import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom'


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
        <>
        <Card className='card' border={"success"} >
                <Card.Img className='product-img' variant="top" alt={props.product.title} src={process.env.PUBLIC_URL + props.product.image}/>
                <Card.Body>
                    <Card.Title>{props.product.title}</Card.Title>
                    <Card.Subtitle>{props.product.price} $</Card.Subtitle>
                    <Card.Text>
                        <ul>
                            {descriptionList}
                        </ul>
                    </Card.Text>
                    <Link className="btn btn-info" to = {`/product/${props.product.id}`} >Просмотр</Link>
                    {/*<Button variant="primary">Go somewhere</Button>*/}
                </Card.Body>
            </Card>
        </>
        // <div className="product-card">
        //     <img className="preview" src={properties.image}/>
        //     {/*<img className="preview" src={img}/>*/}
        //     <ul>
        //         {descriptionList}
        //     </ul>
        // </div>
    );
};

export default ProductCard;