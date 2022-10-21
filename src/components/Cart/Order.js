import React, {useState} from "react";
import "./styleOrder.css"
import AuthService from "../../forAuthorization/services/auth.service";
import OrderListItem from "./OrderListItem";

const Order = (props) => {
    return (
        <div>
            <h1 className="title-cart"> Создание заказа</h1>
            <h3>
                {/*<strong>{currentUser.username}</strong>*/}
            </h3>
        <ul className="cart-list">


            {/*{
                props.cartList.map(
                    productInCart =>
                        <Card key={productInCart.id} className='cart'>
                            <Card.Img className='item-img' variant="top" alt={productInCart.title}
                                      src={productInCart.image}/>
                            <Card.Title className="item-name">{productInCart.title}</Card.Title>
                            <Card.Subtitle className="item-price">{productInCart.price} $</Card.Subtitle>
                            <Button onClick={() => props.deleteProductFromCart(productInCart.id)} className="product-button"
                                    variant="primary"> удалить
                            </Button>
                            {/*<Count Cart={Cart} quantity={productInCart.quantity}*/}
            {/*        id={productInCart.id}/>*/}





            {props.cartList.map((cartItem) => {
                return (
                    <li key={cartItem.id}>
                        <div className="cart-list-item">
                            <div className="cart-list-item__header">
                                <div className="cart-list-item__image">
                                    <img src={cartItem.image} />
                                </div>
                                <h4 className='cart-list-item__name'>{cartItem.title}</h4>
                            </div>
                            <div>
                                <button className="button-cart" onClick={() => props.addProductInCart(cartItem.id)}>+</button>
                                <span className="cart-list-item__count">{cartItem.quantity}</span>
                                <button className="button-cart" onClick={() => props.removeProductFromCart(cartItem.id)}>-</button>
                            </div>
                            <span className="cart-list-item__total-price">{cartItem.total}</span>
                            <button className="cart-list-item__delete" onClick={() => props.deleteProductFromCart(cartItem.id)}>Удалить</button>
                        </div>
                    </li>
                );
            })}
        </ul>
    </div>
    );
};

export default Order;

