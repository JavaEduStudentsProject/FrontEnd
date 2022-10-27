import React, {useContext, useEffect, useState} from "react";
import img from "../../images/img_1.png";
import DropDownMenu from "./DropDownMenu";
import SearchField from "./SearchField";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import avatar1 from '../../images/avatar.jpg'
import {FilterArrayContext, ImmutableProductListContext, PriceFilterArrayContext} from "../../services/Context";
import AuthService from "../../forAuthorization/services/auth.service";
import EventBus from "../../forAuthorization/common/EventBus";
import {FaShoppingCart} from "react-icons/fa";
import Cart from "../Cart/Cart"



export default function Header(props) {
    let [cartOpen, setCartOpen] = useState(false)
    const {immutableProductList} = useContext(ImmutableProductListContext);
    const {countProductInBasket} = props;

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
                        <FaShoppingCart onClick={() => setCartOpen(cartOpen = !cartOpen)}
                                        className={`shop-cart-button ${cartOpen && 'active'}`}/>

                        {cartOpen && (
                            <div className={'shop-cart'}>
                                <Cart cartList={props.cartList} setCartlist={props.setCartList}
                                      incrementProductCount={props.incrementProductCount}

                                      setCountProductInBasket={props.setCountProductInBasket}
                                      decrementProductCount={props.decrementProductCount}
                                      deleteProductFromCart={props.deleteProductFromCart}
                                      deletePurchasedProduct={props.deletePurchasedProduct}
                                      removeProductFromCart={props.removeProductFromCart}
                                      addProductInCart={props.addProductInCart}
                                      cartOpen={cartOpen} setCartOpen={setCartOpen}/>
                                <span className="count-products-in-basket">{countProductInBasket}</span>
                            </div>
                        )}

                    </Stack>
                </div>
                    {currentUser ? (
                    <div className="navbar-nav ml-auto">

                        <Stack className="avatarIcon">
                            <Avatar alt="Пользователь" src={currentUser.username} onClick={()=>{window.location.assign("/profile")}}/>
                        </Stack>

                        <li className="nav-item">
                            <p className="Logout" >
                            <a href="/" className="nav-link" onClick={logOut}>
                                Log out
                            </a>
                            </p>
                        </li>
                    </div>

                ) : (
                <div className="navbar-nav ml-auto">
                    <Stack className="avatarIcon">
                        <Avatar alt="Пользователь" src={avatar1} onClick={() => {
                            window.location.assign("/login")
                        }}/>
                    </Stack>
                </div>
            )}
            </nav>
            <nav className="nav-list">
                <button onClick={()=>{window.location.assign("/aboutUs")}}>About us</button>
                <button onClick={()=>{window.location.assign("/contacts")}}>Contacts</button>
                <button onClick={()=>{window.location.assign("/delivery")}}>Delivery</button>
            </nav>
        </header>
    )
}
