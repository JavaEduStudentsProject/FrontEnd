import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProductList from "../../ProductList";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom'


const ProductCard = (props) => {

    const flatProduct = ProductList.flatProduct(props.item);
    const keys = Object.keys(flatProduct).filter(key => key != "images" && key != "description");

    const descriptionList = keys.map((key, index) =>
        <li key={flatProduct.id + index}>{keys[index]}: {flatProduct[key]}</li>
    );


    // function test(img) {
    //     let image = require(img);
    //     return image;
    // }
    // let img = flatProduct.image;
    // let test = "../../images/rd-d2.png";

    // let image = require();
    // let image = require("../../images/rd-d2.png");
    // let image = require(`${img}`);

    // console.log("../../images/rd-d2.png")
    // console.log(flatProduct.image)
    // console.log(img)
    // console.log(image)

    // let image = require(flatProduct.image);
    // console.log(image);

    // function getImage() {
    //     let img;
    //     if (flatProduct.image[0] === ".") {
    //         console.log(require(flatProduct.image));
    //         img = require(flatProduct.image);
    //
    //     } else {
    //         img = process.env.PUBLIC_URL + flatProduct.image;
    //     }
    //     console.log("Проверка изображений:");
    //
    //     console.log(flatProduct.image);
    //     console.log(flatProduct.image[0]);
    //     console.log(img);
    //     return img;
    // }
    //
    // let image = getImage();


    return (
        <>
        <Card className='card' border={"success"} >

                <Card.Img className='product-img' variant="top" alt={flatProduct.title} src={process.env.PUBLIC_URL + flatProduct.image}/>
                {/*<Card.Img className='product-img' variant="top" alt={flatProduct.title} src={image}/>*/}
                {/*<Card.Img className='product-img' variant="top" alt={flatProduct.title} src={require("../../images/rd-d2.png")}/>*/}
                {/*<Card.Img className='product-img' variant="top" alt={flatProduct.title}*/}
                {/*          src={process.env.PUBLIC_URL + flatProduct.thumbnail}/>*/}

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