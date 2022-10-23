import React from 'react';
import "./styleOrder.css"
const OrderListItem = (props) => {


    return (
        <div className="cart-list-item">
            <div className="cart-list-item__header">
                <div className="cart-list-item__image">
                    <img src={props.cartItem.image} />
                </div>
                <h4 className='cart-list-item__name'>{props.cartItem.title}</h4>
            </div>
            <div>
                <button className="button-cart" onClick={() => props.addProductInCart(props.cartItem.id)}>+</button>
                <span className="cart-list-item__count">{props.cartItem.quantity}</span>
                <button className="button-cart" onClick={() => props.removeProductFromCart(props.cartItem.id)}>-</button>
            </div>
            <span className="cart-list-item__total-price">{props.cartItem.total}</span>
            <button className="cart-list-item__delete" onClick={() => props.deleteProductFromCart(props.cartItem.id)}>Удалить</button>
        </div>
    )
};

export default OrderListItem;