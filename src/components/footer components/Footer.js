import {React, useContext, useState} from "react"
import SocialNetworkIcons from "./SocialNetworkIcons";
import {useParams} from 'react-router-dom'
import {
    FilterArrayContext,
    ImmutableProductListContext,
    PriceFilterArrayContext,
    ProductListContext
} from "../../services/Context";

export default function Footer() {
    let c = "\u00A9";


    //todo кнопки для отладки, удалить:
    const {immutableProductList} = useContext(ImmutableProductListContext);
    const {products} = useContext(ProductListContext);
    const {filterArray} = useContext(FilterArrayContext);
    const {priceDelta} = useContext(PriceFilterArrayContext);
    const {category, subCategory} = useParams();

    function print1() {
        console.log(immutableProductList)
    }

    function print2() {
        console.log(products)
    }

    function print3() {
        console.log(filterArray)
    }

    function print4() {
        console.log(priceDelta)
    }



    return (
        <footer className="footer">
            <h4 className="copyright">{c} 2022 Elisey K Team development. All rights reserved.</h4>
            <button onClick={print1}>Неизменямый список</button>
            <button onClick={print2}>Изменямый список</button>
            <button onClick={print3}>Фильтры</button>
            <button onClick={print4}>Диапазон цен</button>

            <SocialNetworkIcons/>
        </footer>
    )
}