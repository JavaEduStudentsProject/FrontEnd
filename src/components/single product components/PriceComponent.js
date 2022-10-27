import React from "react";
import MyButton from "../UI/button/MyButton";

function ProductPlusMinusButton(props) {

    return (
        <div className="price">
            <h2>Цена: {props.product.price}</h2>
            <MyButton id="cartPlusButton" onClick={() =>
                props.incrementProductCount(props.product.id)
            }>
                В корзину</MyButton>
            <MyButton id="cartMinusButton" onClick={() =>
                props.decrementProductCount(props.product)}

            >Удалить</MyButton>
            <h3>В корзине: {props.countProductInBasket}</h3>
        </div>
    );
}

export default ProductPlusMinusButton;