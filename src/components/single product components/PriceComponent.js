import React, {useState} from "react";
import MyButton from "../UI/button/MyButton";

function ProductPlusMinusButton(props) {
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
                props.addProductInCart(props.product.id)
                setCountProductInBasket(countProductInBasket + 1)
                incrementProductCount()
            }}>

                В корзину</MyButton>
            <MyButton id="cartMinusButton" onClick={() => {
                props.deleteProductFromCart(props.product.id)
                setCountProductInBasket(countProductInBasket - 1)
                decrementProductCount()
            }}>Удалить</MyButton>
            {/*<h3>В корзине: {count}</h3>*/}
        </div>
    );
};

export default ProductPlusMinusButton;