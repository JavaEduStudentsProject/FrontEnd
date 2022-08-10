import React, {useState} from "react";
import ReactDom from "react-dom";
import StarRating from "./StarRating";
import PriceComponent from "./PriceComponent"
import MoneyInCreditComponent from "./MoneyInCreditComponent"
import img from "../images/img_3.jpg";


export default function MainContent() {
    let productName = "Название товара";

    return (
        <div className="main-content">
            <h1>{productName}</h1>
            <div className="main-block">
                <div className="product-card">
                    <div className="img-and-shortdescr">
                    <img className="product-img" src={img} />
                    <ul className="short-descr">
                        <h4>Короткое описание товара. Характеристики для фильтров</h4>
                        <li>Производитель</li>
                        <li>Цвет</li>
                        <li>Объем памяти</li>
                        <li>Рейтинг</li>
                        <StarRating/>
                    </ul>
                    </div>
                    <div className="full-descr">
                        <h4>Описание товара</h4>
                        <ul className="list">
                            <li>Цвет</li>
                            <li>Размер</li>
                            <li>Вес</li>
                        </ul>
                    </div>
                </div>
                <div className="money-block">
                    <PriceComponent/>
                    <MoneyInCreditComponent/>
                </div>
            </div>
        </div>
    )
}
