import "./styleCart.css"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import React, {useState} from 'react';
import Count from "./Count";

const increase = (id) => {
     console.log("increase", id)

 }
const showOrders = (props) => {
    let summa = 0;
    props.order.forEach(el => summa += Number.parseFloat(el.price))
    return (
        <div>
            <h1 className="title-cart">Корзина</h1>
            {
                props.order.map(
                    productInCart =>
                        <Card key={productInCart.id} className='cart'>
                            <Card.Img className='item-img' variant="top" alt={productInCart.title}
                                      src={productInCart.image}/>
                            <Card.Title className="item-name">{productInCart.title}</Card.Title>
                            <Card.Subtitle className="item-price">{productInCart.price} $</Card.Subtitle>
                            <Button onClick={() => props.deleteOrder(productInCart.id)} className="product-button"
                                    variant="primary"> удалить
                            </Button>
                            <Count increase={increase} id={productInCart.id}/>
                        </Card>
                )
            }
            <p className="item-sum"> Cумма: {new Intl.NumberFormat().format(summa)}</p>

        </div>)
}

const showNothing = () => {
    return (
        <div>
            <h1 className="title-cart">Товаров нет</h1>
        </div>
    )
}
const Cart = (props) => {
        return (
        <div>
            {
                props.order.length > 0 ?
                    showOrders(props) : showNothing()
            }

        </div>
    );
}

export default Cart;