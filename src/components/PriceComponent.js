import React, {useContext, useState} from "react";
import MyButton from "./UI/button/MyButton";
import {BasketArrayContext} from "./Context";


function ProductPlusMinusButton(props) {

    let [count, setCount] = useState(0);

    const {basketArray} = useContext(BasketArrayContext);
    const { setCountProductInBasket, countProductInBasket} = props;

    function incrementProductCount() {
        setCount(++count);
        console.log("Added to card. Product quantity: " + count)
    }

    function decrementProductCount() {
        setCount(--count);
        console.log("Deleted from card. Product quantity: " + count)
    }

    return (
        <div className="price">
            <h2>Цена: {props.product.price}</h2>
            <MyButton id="cartPlusButton" onClick={() => {
                setCountProductInBasket(countProductInBasket+1)
                incrementProductCount()
                basketArray.push(props.product)
                console.log("У вас в корзине " + basketArray)
            }}>В корзину</MyButton>
            <MyButton id="cartMinusButton" onClick={() => {
                setCountProductInBasket(countProductInBasket-1)
                decrementProductCount()
            }}>Удалить</MyButton>
            <h3>В корзине: {count}</h3>
        </div>
    );
};

export default ProductPlusMinusButton;