import React, {useState} from "react";
import MyButton from "./UI/button/MyButton";

function ProductPlusMinusButton() {
    let price = 100000000;
    let [count, setCount] = useState(0);

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
            <h2>Цена: {price}</h2>
            <MyButton id="cartPlusButton" onClick={incrementProductCount}>В корзину</MyButton>
            <MyButton id="cartMinusButton" onClick={decrementProductCount}>Удалить</MyButton>
            <h3>В корзине: {count}</h3>
        </div>
    );
};

export default ProductPlusMinusButton;