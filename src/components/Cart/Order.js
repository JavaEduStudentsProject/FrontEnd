import React from "react";
import AuthService from "../../forAuthorization/services/auth.service";

const Order = (props) => {
     const currentUser = AuthService.getCurrentUser();

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

