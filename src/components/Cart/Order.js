import React, {useState} from "react";
import "./styleOrder.css"
import "./styleCart.css"
import AuthService from "../../forAuthorization/services/auth.service";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import OrderService from "../../services/OrderService";


const Order = (props) => {
    let [orderId, setOrderId] = useState(0);

    function generateOrderId() {
        setOrderId(++orderId);
    }

// let sumTotalProd=0;
//     props.cartList.forEach(el => sumTotalProd += Number.parseFloat(el.quantity))

    let sumTotalQuantity = 0;
    props.cartList.forEach(el => sumTotalQuantity += Number.parseFloat(el.quantity))
    console.log(sumTotalQuantity)
    let discountedTotalSum = 0;
    props.cartList.forEach(el => discountedTotalSum += Number.parseFloat(el.discountedPrice) * Number.parseFloat(el.quantity))
    console.log(discountedTotalSum)

    const currentUser = AuthService.getCurrentUser();
    const createOrder = () => {
        let order = [{
            "products": props.cartList,
            "total": summa,
            "discountedTotal": discountedTotalSum,
            "totalProducts": Number.parseFloat(props.cartList.length + 1),
            "totalQuantity": sumTotalQuantity,
            "username": currentUser.username
        }]
        console.log(order)
        console.log(JSON.stringify(order[0]))
        localStorage.setItem("newOrder",  JSON.stringify(order[0]));

        OrderService.saveOrder(JSON.stringify(order[0])).then(r => {
            props.setCartList([])
        });
    };

    let summa = 0;
    props.cartList.forEach(el => summa += Number.parseFloat(el.price) * Number.parseFloat(el.quantity))
    return (
        <div>
            <h1 className="title-cart"> Создание заказа</h1>
            <h3>
                {/*<strong>{currentUser.username}</strong>*/}
            </h3>
            <ul className="cart-list">

                {props.cartList.map((cartItem) => {
                    return (
                        <li key={cartItem.id}>
                            <div className="cart-list-item">
                                <div className="cart-list-item__header">
                                    <div className="cart-list-item__image">
                                        <img src={cartItem.image}/>
                                    </div>
                                    <h4 className='cart-list-item__name'>{cartItem.title}</h4>
                                </div>
                                <div>
                                    <button className="button-cart"
                                            onClick={() => props.addProductInCart(cartItem.id)}>+
                                    </button>
                                    <span className="cart-list-item__count">{cartItem.quantity}</span>
                                    <button className="button-cart"
                                            onClick={() => props.removeProductFromCart(cartItem.id)}>-
                                    </button>
                                </div>
                                <span className="cart-list-item__count">{cartItem.total}</span>
                                <span className="cart-list-item__count">{cartItem.discountPercentage}</span>
                                <span
                                    className="cart-list-item__count">{cartItem.discountedPrice * cartItem.quantity}</span>
                                <button className="product-button-cart"
                                        onClick={() => props.deleteProductFromCart(cartItem.id)}>Удалить
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <p className="sum-order"> Сумма заказа: {(new Intl.NumberFormat().format(summa))}</p>
            <p className="sum-order"> Сумма заказа со
                скидкой: {(new Intl.NumberFormat().format(discountedTotalSum))}</p>

            <Button className="order-button" onClick={() => createOrder()}>
            Заказать
            </Button>
        </div>
    );
};

export default Order;

