import React from "react";
import PriceComponent from "./PriceComponent"
import MoneyInCreditComponent from "./MoneyInCreditComponent"
import img from "../../images/img_3.jpg";
import ShortProductDescription from "./ShortProductDescription";
import {useParams} from "react-router-dom"

export default function SingleProduct(props) {

    let immutable = JSON.parse(localStorage.getItem('immutableProductList'))

    const {id} = useParams();
    localStorage.setItem(`${id}`, JSON.stringify(immutable.find(p => p.id === Number(id))))

    let product = JSON.parse(localStorage.getItem(`${id}`))

    const {setCountProductInBasket, countProductInBasket} = props;

    function getImage() {
        console.log(product.image)
        return product.image[0] !== "h" ? require(`../../images/${product.image}`) : process.env.PUBLIC_URL + product.image;

    }

    let image = getImage();

    return (
        <div className="single-product">
            <h1 className="productName">{product.title}</h1>
            <div className="main-block">
                <div className="product-card">
                    <div className="img-and-shortdescr">
                        <img className="product-img" src={image}/>
                        <ShortProductDescription product={product}/>
                    </div>
                    {/*<div className="full-descr">*/}
                    {/*    <h4>Описание товара</h4>*/}
                    {/*    <ul className="list">*/}
                    {/*        <li>Размер: {product.size}</li>*/}
                    {/*        <li>Цвет</li>*/}
                    {/*        <li>Вес</li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
                <div className="money-block">
                    <PriceComponent countProductInBasket={countProductInBasket}
                                    incrementProductCount={props.incrementProductCount}
                                    decrementProductCount={props.decrementProductCount}
                                    setCountProductInBasket={setCountProductInBasket} product={product}
                                    deleteProductFromCart={props.deleteProductFromCart}
                                    removeProductFromCart={props.removeProductFromCart}
                                    addProductInCart={props.addProductInCart}/>
                    <MoneyInCreditComponent/>
                </div>
            </div>
        </div>
    )
}
