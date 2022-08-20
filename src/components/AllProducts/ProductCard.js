import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import "bootstrap/dist/css/bootstrap.min.css";
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

    const flatProduct = recursiveSearch(props.item);
    const keys = Object.keys(flatProduct).filter(key => key != "images" && key != "description");

    const descriptionList = keys.map((key, index) =>
        <li key={flatProduct.id + index}>{keys[index]}: {flatProduct[key]}</li>
    );

    return (
        <>
        <Card className='card' border={"success"} >
                <Card.Img className='product-img' variant="top" alt={flatProduct.title} src={process.env.PUBLIC_URL + flatProduct.thumbnail}/>
                <Card.Img className='product-img' variant="top" alt={flatProduct.title}
                          src={process.env.PUBLIC_URL + flatProduct.thumbnail}/>

                <Card.Title className="product-name">{flatProduct.title}</Card.Title>
                <Card.Body className='product-description'>
                    {/*<Card.Text>*/}
                    <ul>
                        {descriptionList}
                    </ul>
                    {/*</Card.Text>*/}
                </Card.Body>
                <Card.Subtitle className="product-price">{flatProduct.price} $</Card.Subtitle>

                <Button className="product-button" variant="primary">
                    <Link className="link-button" to={`/product/${flatProduct.id}`}>Просмотр</Link>
                </Button>

            </Card>
        </>
        // <div className="product-card">
        //     <img className="preview" src={flatProduct.image}/>
        //     {/*<img className="preview" src={img}/>*/}
        //     <ul>
        //         {descriptionList}
        //     </ul>
        // </div>
    );
};

export default ProductCard;