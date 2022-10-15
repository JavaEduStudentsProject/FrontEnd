import React, {useContext, useState} from "react";
import img from "../../images/img_1.png";
import DropDownMenu from "./DropDownMenu";
import SearchField from "./SearchField";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import avatar1 from '../../images/avatar.jpg'
import {FilterArrayContext, ImmutableProductListContext, PriceFilterArrayContext} from "../../services/Context";
import {Link, useParams} from "react-router-dom";
import ProductList from "../../services/ProductList";
import AuthService from "../../forAuthorization/services/auth.service";
import EventBus from "../../forAuthorization/common/EventBus";
import {FaShoppingCart} from "react-icons/fa";
import Cart from "../Cart/Cart"


export default function Header(props) {
    let [cartOpen, setCartOpen] = useState(false)
    const [quantity, setQuantity] = useState(1);
    const {immutableProductList} = useContext(ImmutableProductListContext);
    const {countProductInBasket} = props;
    const [testRESTAPIArray, setTestRESTAPIArray] = useState([]);

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

    function print5() {
        let userId = 97 //в перспективе заменить на метод получения id текущего пользователя
        ProductService.getRecommendedProducts(userId)
            .then(result => result.json())
            .then(currentData => setTestRESTAPIArray(currentData));
    }
    console.log("data 2: " + testRESTAPIArray)

    function print6() {
        let basketArray = [3, 6, 35]
        ProductService.getRecommendedProductsFromBasket(basketArray)
            .then(result => result.json())
            .then(currentData => setTestRESTAPIArray(currentData));

    }


    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setShowModeratorBoard(false);
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };

    // const increase = (id) => {
    //     console.log("increase", id)/
    //
    //     setCart((cart) => {
    //         return cart.map((product) => {
    //             if (product.id === id) {
    //                 return {
    //                     ...product,
    //                     quantity: ++product.quantity
    //                 };
    //             }
    //             return product
    //         })
    //                 })
    // }

    return (
        <header>
            <nav className="nav-panel">
                <img className="nav-img" src={img} onClick={() => {
                    window.location.assign("/")
                }}/>
                <DropDownMenu/>
                <SearchField handleChange={props.handleChange} searchField={props.searchField}/>

                    {currentUser ? (
                        <div className="userIcons">
                            <Stack>
                                <Avatar alt="Корзина"
                                        src='https://thumbs.dreamstime.com/b/%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%BA%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D1%8B-%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B9-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D0%BB%D0%B0-%D0%BB%D0%B8%D0%BD%D0%B8%D1%8E-%D0%BF%D0%B8%D0%BA%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%83-171571446.jpg'/>
                                <span className="count-products-in-basket">{countProductInBasket}</span>
                            </Stack>
                        <div className="navbar-nav ml-auto">

                                <Stack className="avatarIcon">
                                <Avatar alt="Пользователь" src={currentUser.username} onClick={()=>{window.location.assign("/profile")}}/>
                        </Stack>

                            <li className="nav-item">
                                <a href="/" className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                                <Stack className="avatarIcon">
                                    <Avatar alt="Пользователь" src={avatar1}  onClick={()=>{window.location.assign("/login")}}/>
                                </Stack>
                        </div>
                    )}
                {/*<div className="userIcons">*/}
                {/*    <Stack>*/}
                {/*        /!*<Avatar alt="Корзина"*!/*/}
                {/*        /!*        src='https://thumbs.dreamstime.com/b/%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%BA%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D1%8B-%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B9-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%B7%D0%B0%D0%BF%D0%BE%D0%BB%D0%BD%D0%B8%D0%BB%D0%B0-%D0%BB%D0%B8%D0%BD%D0%B8%D1%8E-%D0%BF%D0%B8%D0%BA%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D1%83-171571446.jpg'/>*!/*/}
                {/*        <FaShoppingCart onClick={() => setCartOpen(cartOpen = !cartOpen)}*/}
                {/*                        className={`shop-cart-button ${cartOpen && 'active'}`}/>*/}

                {/*        {cartOpen && (*/}
                {/*            <div className={'shop-cart'}>*/}
                {/*                <Cart order={props.order} setOrder={props.setOrder}*/}
                {/*                      deleteOrder={props.deleteOrder} quantity={quantity}*/}
                {/*                      setQuantity={setQuantity}></Cart>*/}
                {/*            </div>*/}
                {/*        )}*/}

                {/*        <span className="count-products-in-basket">{countProductInBasket}</span>*/}
                {/*    </Stack>*/}

                {/*    <Stack className="avatarIcon">*/}
                {/*        <Avatar alt="Пользователь" src={avatar1}/>*/}
                {/*    </Stack>*/}

                {/*</div>*/}

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
                <button onClick={print5}>Тест оркестратора</button>
                <button onClick={print6}>Рекомендация для корзины</button>
                <a href="http://localhost:3000/">Все продукты</a>
            </nav>
        </header>
    )
}
