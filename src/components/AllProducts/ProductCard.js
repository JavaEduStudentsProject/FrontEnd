import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom'



const ProductCard = (props) => {
    console.log(props);
    console.log(props.product);
    const keys1 = Object.keys(props.product).filter(key => key != "image" && key != "id" && key != "rating"&& key != "title"&& key != "price");
    console.log("Keys: " + keys1);

    const descriptionList = keys1.map((key, index) =>
        <li key={props.product.id + index}>{keys1[index]}: {props.product[key]}</li>
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
    );
};

export default ProductCard;