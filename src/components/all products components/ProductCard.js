import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProductList from "../../services/ProductList";
// import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom'


const ProductCard = (props) => {
    const flatProduct = ProductList.flatProduct(props.item);
    const keys = Object.keys(flatProduct).filter(key => key !== "image" && key !== "description" && key !== "title");

    const descriptionList = keys.map((key, index) =>
        <li key={flatProduct.id + index}>{keys[index]}: {flatProduct[key]}</li>
    );

    function getImage() {
        return flatProduct.image[0] !== "h" ? require(`../../images/${flatProduct.image}`) : process.env.PUBLIC_URL + flatProduct.image;
    }

    let image = getImage();


    return (
        <>
        <Card className='card' border={"success"} >
                <Card.Img className='product-img' variant="top" alt={flatProduct.title} src={image}/>
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
    );
};

export default ProductCard;