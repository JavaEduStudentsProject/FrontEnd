import React, {useState} from "react";
import MyButton from "../UI/button/MyButton";
import {FaShoppingCart} from "react-icons/fa";
import Cart from "../Cart/Cart";

function ProductPlusMinusButton(props) {
    // let price = 100000000;
    let [count, setCount] = useState(0);
    let [addCartActive, setAddCartActive] = useState(false)
    const {setCountProductInBasket, countProductInBasket} = props;

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
                props.addToOrder(props.product.id)
                 setCountProductInBasket(countProductInBasket + 1)
                incrementProductCount()
            }}>

                В корзину</MyButton>
            <MyButton id="cartMinusButton" onClick={() => {
                props.deleteOrder(props.product.id)
                 setCountProductInBasket(countProductInBasket - 1)
                decrementProductCount()
            }}>Удалить</MyButton>
            {/*<h3>В корзине: {count}</h3>*/}
        </div>
    );
};

export default ProductPlusMinusButton;