import React from "react";
import AuthService from "../../forAuthorization/services/auth.service";
import {useState} from "/react";
import Cart from "../Cart/Cart"
import Count from "./Count";

const Order = (props) => {
     const currentUser = AuthService.getCurrentUser();
    let [orderId, setOrderId] = useState(0);

    function incrementOrderId() {
        setOrderId(++orderId);
    }


let newOrder=[{
    id: incrementOrderId(),
    products:props.productsInCart,

}]
    //const newItem = props.productsInCart.find((item) => item.id === id);
    // let newItemTemp=[{
    //     id:newItem.id,
    //     title:newItem.title,
    //     image:newItem.price,
    //     discountPercentage:newItem["non-filter_features"]["discountPercentage"],
    //     quantity:1
    // }]

    return (
        <div>
            <h1 className="title-cart"> Создание заказа</h1>
            <h3>
                <strong>{currentUser.username}</strong>
            </h3>
        </div>
    )
};

export default Order;

