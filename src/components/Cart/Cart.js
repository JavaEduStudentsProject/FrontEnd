import "./styleCart.css"
import "./styleOrder.css"
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import ProductService from "../../services/ProductService";

const showOrders = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [orchestratorResponse, setOrchestratorResponse] = useState("");

    let summa = 0;
    props.cartList.forEach(el => summa += Number.parseFloat(el.price) * Number.parseFloat(el.quantity))

    function onHandle() {
        props.setCartOpen(prevState => !prevState)
        let productsInBasketArray = JSON.parse(localStorage.getItem("cartList"));
        let arrayWithIds = productsInBasketArray.map(product => product.id)
        console.log(arrayWithIds);
        ProductService.getRecommendedProductsFromBasket(arrayWithIds)
            .then(result => result.json())
            .then(currentData => setOrchestratorResponse(currentData));
        console.log(orchestratorResponse)
        }


    return (
        <div>
            <h1 className="title-cart">Корзина</h1>
            {
                props.cartList.map(
                    productInCart =>
                        <Card key={productInCart.id} className='cart'>
                            <Card.Img className='item-img' variant="top" alt={productInCart.title}
                                      src={productInCart.image}/>
                            <Card.Title className="item-name">{productInCart.title}</Card.Title>
                            <Card.Subtitle className="item-price">{productInCart.price} $</Card.Subtitle>
                            <div>

                                <button className="button-cart"
                                        onClick={() => props.decrementProductCount(productInCart)}>-
                                </button>
                                <span className="cart-list-item__count">{productInCart.quantity}</span>
                                <button className="button-cart"
                                        onClick={() => props.incrementProductCount(productInCart.id)}>+
                                </button>
                            </div>
                            <Button onClick={() => props.deleteProductFromCart(productInCart)}
                                    className="product-button"
                                    variant="primary"> удалить
                            </Button>
                        </Card>
                )
            }
            <p className="item-sum"> Итого: {(new Intl.NumberFormat().format(summa))}</p>

            {/*<Button className="order-button" onClick={() => props.setCartOpen(!props.cartOpen)}>*/}
            <Button className="order-button" onClick={onHandle}>
                <Link className="link-button" to={`/order/`}>Создать заказ</Link>
            </Button>
        </div>)
}

const showNothing = () => {
    return (
        <div>
            <h1 className="title-cart">Товаров нет</h1>
        </div>
    )
}
const Cart = (props) => {
    return (
        <div>
            {
                props.cartList.length > 0 ?
                    showOrders(props) : showNothing()
            }
        </div>
    );
}

export default Cart;