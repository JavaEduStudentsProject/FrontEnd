import React, {useContext, useState} from "react";
import img from "../../images/img_1.png";
import DropDownMenu from "./DropDownMenu";
import SearchField from "./SearchField";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import avatar1 from '../../images/avatar.jpg'
import {FilterArrayContext, ImmutableProductListContext, PriceFilterArrayContext} from "../../services/Context";
import {useParams} from "react-router-dom";
import {FaShoppingCart} from "react-icons/fa";
import Cart from "../Cart/Cart"


export default function Header(props) {
    let [cartOpen, setCartOpen] = useState(false)
    const [quantity, setQuantity] = useState(1);
    const {immutableProductList} = useContext(ImmutableProductListContext);
    const {countProductInBasket} = props;

    //todo кнопки для отладки, удалить:

    const {filterArray} = useContext(FilterArrayContext);
    const {priceDelta} = useContext(PriceFilterArrayContext);
    const {category, subcategory} = useParams();

    console.log(category)
    console.log(subcategory)

    function print1() {
        console.log(immutableProductList)
    }

    function print3() {
        console.log(filterArray)
    }

    function print4() {
        console.log(priceDelta)
    }

    return (
        <header>
            <nav className="nav-panel">
                <img className="nav-img" src={img} onClick={() => {
                    window.location.assign("/")
                }}/>
                <DropDownMenu/>
                <SearchField handleChange={props.handleChange} searchField={props.searchField}/>
                <div className="userIcons">
                    <Stack>
                        {/*<Avatar alt="Корзина"*/}
                        {/*        src='https://thumbs.dreamstime.com/b/%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%BA%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D1%8B-%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B9-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D0%BB%D0%B0-%D0%BB%D0%B8%D0%BD%D0%B8%D1%8E-%D0%BF%D0%B8%D0%BA%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%83-171571446.jpg'/>*/}
                        <FaShoppingCart onClick={() => setCartOpen(cartOpen = !cartOpen)}
                                        className={`shop-cart-button ${cartOpen && 'active'}`}/>

                        {cartOpen && (
                            <div className={'shop-cart'}>
                                <Cart order={props.order} setOrder={props.setOrder}
                                      deleteOrder={props.deleteOrder} quantity={quantity}
                                      setQuantity={setQuantity} cartOpen={cartOpen} setCartOpen={setCartOpen}></Cart>
                            </div>
                        )}

                        <span className="count-products-in-basket">{countProductInBasket}</span>
                    </Stack>

                    <Stack className="avatarIcon">
                        <Avatar alt="Пользователь" src={avatar1}/>
                    </Stack>

                </div>

            </nav>
            <nav className="nav-list">
                <ul>Крупные</ul>
                <ul>категории</ul>
                <ul>первого</ul>
                <ul>слоя</ul>
                <ul>вложенности</ul>
                <button onClick={print1}>Неизменямый список</button>
                <button onClick={print3}>Фильтры</button>
                <button onClick={print4}>Диапазон цен</button>
                <a href="http://localhost:3000/">Все продукты</a>
            </nav>
        </header>
    )
}
