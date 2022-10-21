import "./styleCart.css"
import "./styleOrder.css"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Count from "./Count";
import React from "react";

const showOrders = (props) => {
    let summa = 0;
    props.cartList.forEach(el => summa += Number.parseFloat(el.price) * Number.parseFloat(el.quantity))
    return (
        <div>
            <h1 className="title-cart">Корзина</h1>
            {
                props.cartList.map(
                    productInCart =>
                        <Card key={productInCart.id} className='cart'>
                            <Card.Img className='item-img' variant="top" alt={productInCart.title}
                                      src={productInCart.image}/>
                            <Card.Title className="item-name">{productInCart.title}</Card.Title>
                            <Card.Subtitle className="item-price">{productInCart.price} $</Card.Subtitle>

                            <div>
                                <button className="button-cart"
                                        onClick={() => props.addProductInCart(productInCart.id)}>+
                                </button>
                                <span className="cart-list-item__count">{productInCart.quantity}</span>
                                <button className="button-cart"
                                        onClick={() => props.removeProductFromCart(productInCart.id)}>-
                                </button>
                            </div>
                            <Button onClick={() => props.deleteProductFromCart(productInCart.id)}
                                    className="product-button"
                                    variant="primary"> удалить
                            </Button>


                        </Card>
                )
            }
            <p className="item-sum"> Итого: {(new Intl.NumberFormat().format(summa))}</p>

            <Button className="order-button" onClick={() => props.setCartOpen(!props.cartOpen)}>
                <Link className="link-button" to={`/order/`}>Создать заказ</Link>
            </Button>
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
                props.cartList.length > 0 ?
                    showOrders(props) : showNothing()
            }
        </div>
    );
}

export default Cart;