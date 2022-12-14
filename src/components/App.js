import React, {useEffect, useState, useMemo} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./header components/Header";
import SingleProduct from "../components/single product components/SingleProduct";
import Footer from "./footer components/Footer";
import Products from "./all products components/Products";
import ProductService from '../services/ProductService'
import {ImmutableProductListContext, FilterArrayContext, ProductListContext} from "../services/Context";
import ProductList from "../services/ProductList";
import Login from "../forAuthorization/components/Login";
import Register from "../forAuthorization/components/Register";
import Profile from "../forAuthorization/components/Profile";
import {useLocalStorage} from "../hooks/useLocalStorage";
import Order from "./Cart/Order";
import AboutUs from "./aditionalPages/AboutUs";
import Contacts from "./aditionalPages/Contacts";
import Delivery from "./aditionalPages/Delivery";
import MainPage from "./main page components/MainPage";
import OrderService from "../services/OrderService";
import WishList from "../forAuthorization/components/WishList";


function App() {
    const [searchField, setSearchField] = useState("");
    const [filterArray, setFilterArray] = useState(["", ""]);
    const [countProductInBasket, setCountProductInBasket] = useLocalStorage(0, "countProductInBasket");
    const [cartList, setCartList] = useLocalStorage([], "cartList");
    const [wishList, setWishList] = useLocalStorage([], "wishList");
    const [immutableProductList, setImmutableProductList] = useState([]);

    useEffect(() => {
        console.log("Вызов useEffect до геттера")
        ProductService.getAllProducts().then((response) => {
            localStorage.setItem('immutableProductList', JSON.stringify(response.data))
            setImmutableProductList(response.data);
        }).catch(error => {
            console.log(error);
        })
        console.log("Вызов useEffect после геттера")
        console.log("Вызов useEffect до геттера")
        OrderService.getAllOrders()
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('allOrderFromDB', JSON.stringify(response.data))
            }).catch(error => {
            console.log(error);
        })
        console.log("Вызов useEffect после геттера")
    }, [])


    const updateCartList = (cartList, newProduct, index) => {
        // Метод slice()возвращает неглубокую копию части массива в новый объект
        // массива, выбранный из start до end (end не включенный),
        // где start и end представляет индекс элементов в этом массиве.
        //     массив не будет изменен.

        // Если количество одного продукта равняется 0, убрать его из корзины
        if (newProduct.count === 0) {
            return setCartList([...cartList.slice(0, index), ...cartList.slice(index + 1)]);
        }
        // Если индекс элемента -1, это значит что в корзине нет этого продукта
        // И его нужно добавить
        if (index === -1) {
            return setCartList([...cartList, newProduct]);

        }
        // Если этот продукт есть, то массив нужно обновить
        // продукт, будь он обычным или обновлённым получаем из второго аргумента
        // Таким образом вычисление, и структура объекта продукта находится в newProduct
        return setCartList([...cartList.slice(0, index), newProduct, ...cartList.slice(index + 1)]);
    };


    // Функция, занимающаяся проверкой и структурой телефона
    // Принимает три параметра, полученный телефон, телефон в корзине (если тот есть), и количество которое нужно купить
    // Если телефон в корзине есть, то возвращаем все поля телефона, изменяя его totalPrice и count, которое зависит от количества купленного
    // Если телефона в корзине нет, то возвращаем объект, который содержит нужные для дальнейшего поля
    const updateProduct = (product, productInCart, quantity) => {
        if (productInCart) {
            return {
                ...productInCart,
                total: productInCart.total + quantity * product.price,
                quantity: productInCart.quantity + quantity
            };
        }

        return {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.image,
            total: product.price * quantity,
            rating: product.non_filter_features.rating,
            discountPercentage: product.non_filter_features.discountPercentage,
            discountedPrice: Math.round(product.price - (product.price * product.non_filter_features.discountPercentage / 100)),
            category: product.category
        };
    };


    function incrementProductCount(id) {
        addProductInCart(id)
        setCountProductInBasket(prevCountProductInBasket => prevCountProductInBasket + 1
        );
        console.log("Added to card. Product quantity: " + countProductInBasket)
    }


    function decrementProductCount(productCart) {
        removeProductFromCart(productCart)
        if (countProductInBasket <= 1) {
            deleteProductFromCart(productCart)
        }
        setCountProductInBasket(prevCountProductInBasket => {
            return (prevCountProductInBasket > 0 ? prevCountProductInBasket - 1 : 0)
        });
    }


    const addProductInCart = (id) => {
        const product = immutableProductList.find((item) => item.id === id);
        const productIndex = cartList.findIndex((item) => item.id === id);
        const productInCart = cartList[productIndex];
        const newProduct = updateProduct(product, productInCart, 1);
        const newCartList = updateCartList(cartList, newProduct, productIndex);
        return {
            cartList: newCartList
        };
    };

    const updateWishList = (wishList, product, index) => {
        if (product.count === 0) {
            return setWishList([...wishList.slice(0, index), ...wishList.slice(index + 1)]);
        }
        if (index === -1) {
            return setWishList([...wishList, product]);
        }
        return setWishList([...wishList.slice(0, index), product, ...wishList.slice(index + 1)]);
    };

    const addProduct = (id) => {
        const product = immutableProductList.find((item) => item.id === id);
        console.log(product)
        const productIndex = wishList.findIndex((item) => item.id === id);
        console.log(productIndex)
        const newWishList = updateWishList(wishList, product, productIndex);
        console.log(newWishList)
        return {
            wishList: newWishList
        };
    };

    function addProductInWish (id) {
        addProduct(id)
        console.log(wishList)
    };

    const removeProductFromCart = (productCart) => {
        let product, productIndex, productInCart, newProduct, newCartList;
        product = immutableProductList.find((item) => item.id === productCart.id);
        productIndex = cartList.findIndex((item) => item.id === productCart.id);
        productInCart = cartList[productIndex];
        if (productCart.quantity > 1) {
            newProduct = updateProduct(product, productInCart, -1);
        }
        newCartList = updateCartList(cartList, newProduct, productIndex);
        return {
            cartList: newCartList
        };
    };

    const deleteProductFromCart = (productCart) => {
        const productInCartTemp = cartList.filter(el => el.id !== productCart.id)
        setCartList(productInCartTemp)
        setCountProductInBasket(prevCountProductInBasket => {
            return (prevCountProductInBasket > 0 ? prevCountProductInBasket - productCart.quantity : 0)

        });
    };


    const handleChange = e => {
        setSearchField(e.target.value);
    };

    const {productArray} = useMemo(() => {
        let productArray = [];
        productArray.push(ProductList.search(immutableProductList, searchField))
        return {productArray}
    }, [searchField])

    console.log(productArray)


    return (
        <ImmutableProductListContext.Provider value={{immutableProductList}}>
            <ProductListContext.Provider value={{productArray}}>
                <FilterArrayContext.Provider value={{filterArray, setFilterArray}}>
                    <div className="container">

                        <Router>
                            <Header cartList={cartList}
                                    removeProductFromCart={removeProductFromCart}
                                    countProductInBasket={countProductInBasket}
                                    setCountProductInBasket={setCountProductInBasket}
                                    addProductInCart={addProductInCart}
                                    searchField={searchField} setCartList={setCartList}
                                    incrementProductCount={incrementProductCount}
                                    decrementProductCount={decrementProductCount}
                                    handleChange={handleChange} deleteProductFromCart={deleteProductFromCart}

                            />
                            <Routes>
                                <Route path="/"
                                       element={
                                           <MainPage
                                               incrementProductCount={incrementProductCount}
                                               decrementProductCount={decrementProductCount}
                                               deleteProductFromCart={deleteProductFromCart}
                                               addProductInCart={addProductInCart}
                                               addProductInWish={addProductInWish}
                                           />
                                       }
                                />
                                <Route path="/product/:id"
                                       element={<SingleProduct incrementProductCount={incrementProductCount}
                                                               decrementProductCount={decrementProductCount}
                                                               countProductInBasket={countProductInBasket}
                                                               deleteProductFromCart={deleteProductFromCart}
                                                               removeProductFromCart={removeProductFromCart}
                                                               addProductInCart={addProductInCart}
                                                               addProductInWish={addProductInWish}
                                                               setCountProductInBasket={setCountProductInBasket}/>}/>
                                <Route path="/:category/:subcategory" element={<Products searchField={searchField}
                                                                                         incrementProductCount={incrementProductCount}
                                                                                         decrementProductCount={decrementProductCount}
                                                                                         removeProductFromCart={removeProductFromCart}
                                                                                         deleteProductFromCart={deleteProductFromCart}
                                                                                         addProductInCart={addProductInCart}
                                                                                         addProductInWish={addProductInWish}

                                />}/>
                                <Route path="/:category" element={<Products searchField={searchField}
                                                                            incrementProductCount={incrementProductCount}
                                                                            decrementProductCount={decrementProductCount}
                                                                            removeProductFromCart={removeProductFromCart}
                                                                            deleteProductFromCart={deleteProductFromCart}
                                                                            addProductInCart={addProductInCart}
                                                                            addProductInWish={addProductInWish}

                                />}/>
                                <Route path="/catalog" element={<Products searchField={searchField}
                                                                          incrementProductCount={incrementProductCount}
                                                                          decrementProductCount={decrementProductCount}
                                                                          removeProductFromCart={removeProductFromCart}
                                                                          deleteProductFromCart={deleteProductFromCart}
                                                                          addProductInCart={addProductInCart}
                                                                          addProductInWish={addProductInWish}

                                />}/>
                                <Route exact path="/login" element={<Login/>}/>
                                <Route exact path="/register" element={<Register/>}/>
                                <Route exact path="/aboutUs" element={<AboutUs/>}/>
                                <Route exact path="/contacts" element={<Contacts/>}/>
                                <Route exact path="/delivery" element={<Delivery/>}/>
                                <Route exact path="/profile" element={<Profile/>}/>
                                <Route exact path="/wishList" element={<WishList/>}/>
                                <Route exact path="/order"
                                       element={<Order cartList={cartList} deleteProductFromCart={deleteProductFromCart}
                                                       removeProductFromCart={removeProductFromCart}
                                                       incrementProductCount={incrementProductCount}
                                                       decrementProductCount={decrementProductCount}
                                                       setCountProductInBasket={setCountProductInBasket}
                                                       updateProduct={updateProduct} addProductInCart={addProductInCart}
                                                       setCartList={setCartList}/>}/>

                            </Routes>
                        </Router>
                        <Footer/>
                    </div>

                </FilterArrayContext.Provider>
            </ProductListContext.Provider>
        </ImmutableProductListContext.Provider>
    )
}

export default App;
