import React, {useContext} from "react";
import PriceComponent from "./PriceComponent"
import MoneyInCreditComponent from "./MoneyInCreditComponent"
import img from "../images/img_3.jpg";
import ShortProductDescription from "./ShortProductDescription";
import { useParams } from "react-router-dom"
import {Context} from "./Context";




export default function MainContent(props) {

    const [products] = useContext(Context);

    const {id} = useParams();
    let product = products.find(p => p.id === Number(id));

    const { setCountProductInBasket, countProductInBasket} = props;

    return (
        <div className="main-content">
            <h1 className="productName">{product.title}</h1>
            <div className="main-block">
                <div className="product-card">
                    <div className="img-and-shortdescr">
                    <img className="product-img" src={process.env.PUBLIC_URL + product.thumbnail} />
                    <ShortProductDescription product={product}/>
                    </div>
                    <div className="full-descr">
                        <h4>Описание товара</h4>
                        <ul className="list">
                            <li>Размер: {product.size}</li>
                            <li>Цвет</li>
                            <li>Вес</li>
                        </ul>
                    </div>
                </div>
                <div className="money-block">
                    <PriceComponent countProductInBasket={countProductInBasket} setCountProductInBasket={setCountProductInBasket} product={product}/>
                    <MoneyInCreditComponent/>
                </div>
            </div>
        </div>
    )
}
