import "./styleCart.css"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import React from 'react';
import {FaTrash} from 'react-icons/fa'
import ProductList from "../../services/ProductList";

const Cart = (props) => {
    // const productsInOrder = JSON.parse(localStorage.getItem("order"));
     console.log(props.order);







    return (
        <div className="cart">
            <h1 className="title-cart">Корзина товаров</h1>

            {props.order.map(
                productInCart=>
                    <Card key={productInCart.id} className='cart' border={"success"}>
                    <Card.Img className='product-img' variant="top" alt={productInCart.title} src={productInCart.image}/>
                    <Card.Title className="product-name">{productInCart.title}</Card.Title>
                    <Card.Subtitle className="product-price">{productInCart.price} $</Card.Subtitle>
                    <Button className="product-button" variant="primary" >удалить
                    </Button>
                        <FaTrash className='delete-icon' onClick={()=>props.deleteOrder(productInCart.id)}/>

                </Card>

            )

            }

            {/*<Button className="product-button" variant="primary">*/}
            {/*    <Link className="link-button" to={`/product/${flatProduct.id}`}>Оформить заказ</Link>*/}
            {/*</Button>*/}

        </div>
    );

}
export default Cart;