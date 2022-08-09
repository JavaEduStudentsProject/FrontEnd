import React, {useState} from "react";

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
            <h6>Цена: {price}</h6>
            <button id="cartPlusButton" onClick={incrementProductCount}>В корзину</button>
            <button id="cartMinusButton" onClick={decrementProductCount}>Удалить</button>
            <h6>В корзине: {count}</h6>
        </div>
    );
};

export default ProductPlusMinusButton;