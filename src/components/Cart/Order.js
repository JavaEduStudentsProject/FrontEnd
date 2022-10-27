import React, {useEffect, useState} from "react";
import SockJsClient from 'react-stomp';
import "./styleOrder.css"
import "./styleCart.css"
import AuthService from "../../forAuthorization/services/auth.service";
import Button from "react-bootstrap/Button";
import OrderService from "../../services/OrderService";
import BasketRecommendations from "./BasketRecommendations";
import Header from "../header components/Header"
import ProductService from "../../services/ProductService";

const Order = (props) => {
    let sumTotalQuantity = 0;
    props.cartList.forEach(el => sumTotalQuantity += Number.parseFloat(el.quantity))
    console.log(sumTotalQuantity)
    let discountedTotalSum = 0;
    props.cartList.forEach(el => discountedTotalSum += Number.parseFloat(el.discountedPrice) * Number.parseFloat(el.quantity))
    console.log(discountedTotalSum)
    const currentUser = AuthService.getCurrentUser();

    const createOrder = () => {
        let order = [{
            // "id":7845,
            "products": props.cartList,
            "total": summa,
            "discountedTotal": discountedTotalSum,
            "userId": currentUser.id,
            "totalProducts": Number.parseFloat(props.cartList.length + 1),
            "totalQuantity": sumTotalQuantity,
            "username": currentUser.username
        }]
        console.log(JSON.stringify(order[0]))
        localStorage.setItem("newOrder", JSON.stringify(order[0]));
        localStorage.setItem("countProductInBasket", JSON.stringify(0))
        props.setCountProductInBasket(prevCountProductInBasket => {
            return (prevCountProductInBasket === 0 ? prevCountProductInBasket : 0)
        });
        OrderService.saveOrder(JSON.stringify(order[0])).then(r => {
            props.setCartList([])
        });
    };

    let summa = 0;
    props.cartList.forEach(el => summa += Number.parseFloat(el.price) * Number.parseFloat(el.quantity))

    // let productsInBasketArray = JSON.parse(localStorage.getItem("cartList"));
    // // const [arrayForRecomComp, setArrayForRecomComp] = useState([]);
    //
    // let arrayWithdIds = productsInBasketArray.map(product => product.id)
    // console.log(arrayWithdIds);
    // // let arrayForRecomComp
    // ProductService.getRecommendedProductsFromBasket(arrayWithdIds);

    // useEffect(() => {
    //     console.log(productsInBasketArray);
    //     let arrayWithdIds = productsInBasketArray.map(product => product.id)
    //     console.log(arrayWithdIds);
    //     setArrayForRecomComp(arrayWithdIds)
    //     ProductService.getRecommendedProductsFromBasket(arrayForRecomComp);
    // }, [])

    const SOCKET_URL = 'http://localhost:8083/ws-connect/';
    const [basketCategoriesArray, setBasketCategoriesArray] = useState([])

    let onConnected = () => {
        console.log("Connected!!")
    }

    let onDisconnected = () => {
        console.log("Disconnected!")
    }

    let onMessageReceived = (msg) => {
        console.log('New Message Received (basketCategoriesArray)!!', msg);
        setBasketCategoriesArray(msg);
        console.log(basketCategoriesArray)

    }


    let tempBasketCategoriesArray = [1, 2, 3]
    return (
        <div>


            {props.cartList.length > 0 ? (

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

                                            {/*<button className="button-cart"*/}
                                            {/*        onClick={() => props.decrementProductCount(cartItem)}>-*/}
                                            {/*</button>*/}
                                            <span className="cart-list-item__count">{cartItem.quantity}</span>
                                            {/*<button className="button-cart"*/}
                                            {/*        onClick={() => props.incrementProductCount(cartItem.id)}>+*/}
                                            {/*</button>*/}
                                        </div>
                                        <span className="cart-list-item__count">{cartItem.total}</span>
                                        <span className="cart-list-item__count">{cartItem.discountPercentage}</span>
                                        <span
                                            className="cart-list-item__count">{cartItem.discountedPrice * cartItem.quantity}</span>
                                        <button className="product-button-cart"
                                                onClick={() => props.deleteProductFromCart(cartItem)}>Удалить
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="sum-order"> Сумма заказа: {(new Intl.NumberFormat().format(summa))}</p>
                    <p className="sum-order"> Сумма заказа со
                        скидкой: {(new Intl.NumberFormat().format(discountedTotalSum))}</p>

                    <BasketRecommendations basketCategoriesArray={basketCategoriesArray}/>
                    <div>For basket recommendation: {basketCategoriesArray}</div>
                    <Button className="order-button" onClick={() => createOrder()}>
                        Заказать
                    </Button>
                </div>
            ) : (
                <div>
                    <p></p>
                </div>)}
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/basketCategoriesData']}
                onConnect={onConnected}
                onDisconnect={onDisconnected}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
        </div>
    );
};

export default Order;

