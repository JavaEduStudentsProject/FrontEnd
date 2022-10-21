import React, {useEffect, useState, useMemo} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./header components/Header";
import SingleProduct from "../components/single product components/SingleProduct";
import Footer from "./footer components/Footer";
import Products from "./all products components/Products";
import ProductService from '../services/ProductService'
import {ImmutableProductListContext, FilterArrayContext,ProductListContext} from "../services/Context";
import ProductList from "../services/ProductList";
import Login from "../forAuthorization/components/Login";
import Register from "../forAuthorization/components/Register";
import Profile from "../forAuthorization/components/Profile";
import {useLocalStorage} from "../hooks/useLocalStorage";
import Order from "./Cart/Order";

function App() {
    const [immutableProductList, setImmutableProductList] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [filterArray, setFilterArray] = useState(["", ""]);
    const [countProductInBasket, setCountProductInBasket] = useState(0);
    // const [productsInCart, setProductsInCart] = useLocalStorage([], "productsInCart")
    const [cartList, setCartList]=useLocalStorage([], "cartList")

    const updateCartList = (cartList, newProduct, index) => {
        // Метод slice()возвращает неглубокую копию части массива в новый объект
        // массива, выбранный из start до end (end не включенный),
        // где start и end представляет индекс элементов в этом массиве.
        //     массив не будет изменен.

        // Если количество одного продукта равняется 0, убрать его из корзины
        if (newProduct.count === 0) {
            return [...cartList.slice(0, index), ...cartList.slice(index + 1)];
        }
        // Если индекс элемента -1, это значит что в корзине нет этого продукта
        // И его нужно добавить
        if (index === -1) {
            return [...cartList, newProduct];
        }
        // Если этот продукт есть, то массив нужно обновить
        // продукт, будь он обычным или обновлённым получаем из второго аргумента
        // Таким образом вычисление, и структура объекта продукта находится в newProduct
        return [...cartList.slice(0, index), newProduct, ...cartList.slice(index + 1)];
    };

    // Функция, занимающаяся проверкой и структурой телефона
// Принимает три параметра, полученный телефон, телефон в корзине (если тот есть), и количество которое нужно купить
// Если телефон в корзине есть, то возвращаем все поля телефона, изменяя его totalPrice и count, которое зависит от количества купленного
// Если телефона в корзине нет, то возвращаем объект, который содержит нужные для дальнейшего поля
    const updateProduct = (product, productInCart, quantity) => {
        if (productInCart) {
            return {
                ...productInCart,
                totalPrice: productInCart.totalPrice + quantity * product.price,
                count: productInCart.count + quantity
            };
        }

        return {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.image,
            total: product.price*quantity,
            discountPercentage: product.discountPercentage,
            discountedPrice: Math.round(product.price-(product.price*product.discountPercentage/100))

        };
    };

    const addProductInCart = (id) => {

        const product = immutableProductList.find((item) => item.id === id);
        const productIndex = cartList.findIndex((item) => item.id === id);
        const productInCart=cartList[productIndex];
        const newProduct = updateProduct(product, productInCart, 1);
        const newCartList=updateCartList(cartList, newProduct, productIndex);
       return {
           cartList : newCartList
       };
    };

    const deleteProductFromCart = (id) => {
    const product = immutableProductList.find((item) => item.id === id);
    const productIndex = cartList.findIndex((item) => item.id === id);
    const productInCart=cartList[productIndex];
    const newProduct = updateProduct(product, productInCart, -1);
    const newCartList=updateCartList(cartList, newProduct, productIndex);
    return {
        cartList : newCartList
    };
};

    const deletePurchasedProduct = (id) => {

        const product = immutableProductList.find((item) => item.id === id);
        const productIndex = cartList.findIndex((item) => item.id === id);
        const productInCart=cartList[productIndex];
        const newProduct = updateProduct(product, productInCart, -productInCart.quantity);
        const newCartList=updateCartList(cartList, newProduct, productIndex);
        return {
            cartList : newCartList
        };
    };

    useEffect(() => {
        console.log("Вызов useEffect до геттера")
        getAllProducts();
        console.log("Вызов useEffect после геттера")
    }, [])

    const getAllProducts = () => {
        console.log("Вызов геттера")
        ProductService.getAllProducts().then((response) => {
            setImmutableProductList(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

//запустить один раз и закомментировать
    // localStorage.setItem('immutableProductList', JSON.stringify(immutableProductList))

    const handleChange = e => {
        setSearchField(e.target.value);
    };

    const {productArray} = useMemo(() => {
        let productArray = [];
        productArray.push(ProductList.search(immutableProductList, searchField))
        return {productArray}
    }, [searchField])

    // const addProductInCart = (id) => {
    //     let isInArray = false;
    //     const newItem = immutableProductList.find((item) => item.id === id);
    //     // let newItemTemp=[{
    //     //     id:newItem.id,
    //     //     title:newItem.title,
    //     //     image:newItem.price,
    //     //     discountPercentage:newItem["non-filter_features"]["discountPercentage"],
    //     //     quantity:1
    //     // }]
    //     productsInCart.forEach(el => {
    //         if (el.id === id)
    //             isInArray = true;
    //     })
    //     if (!isInArray)
    //
    //         setProductsInCart([...productsInCart, newItem])
    // };

    // const deleteProductInCart = (id) => {
    //     const productsInCartTemp=productsInCart.filter(el=>el.id!==id)
    //     setProductsInCart(productsInCartTemp)
    // };

    return (
        <ImmutableProductListContext.Provider value={{immutableProductList}}>
            <ProductListContext.Provider value={{productArray}}>
                <FilterArrayContext.Provider value={{filterArray, setFilterArray}}>
                    <div className="container">

                        <Router>
                            {/*productsInCart={productsInCart} setProductsInCart={setProductsInCart}*/}
                            <Header deletePurchasedProduct={deletePurchasedProduct} cartList={cartList} deleteProductFromCart={deleteProductFromCart}
                                    countProductInBasket={countProductInBasket}
                                    searchField={searchField}
                                    handleChange={handleChange}
                                    />
                            <Routes>
                                <Route path="/product/:id"
                                       element={<SingleProduct countProductInBasket={countProductInBasket}
                                                               deleteProductFromCart={deleteProductFromCart} addProductInCart={addProductInCart}
                                                               setCountProductInBasket={setCountProductInBasket}/>}/>
                                <Route path="/:category/:subcategory" element={<Products searchField={searchField}
                                                                                         deleteProductFromCart={deleteProductFromCart}
                                                                                         addProductInCart={addProductInCart}/>}/>
                                <Route path="/:category" element={<Products searchField={searchField}
                                                                            deleteProductFromCart={deleteProductFromCart}
                                                                            addProductInCart={addProductInCart}/>}/>
                                <Route path="/" element={<Products searchField={searchField}
                                                                   deleteProductFromCart={deleteProductFromCart}
                                                                   addProductInCart={addProductInCart}/>}/>
                                <Route exact path="/login" element={<Login />} />
                                <Route exact path="/register" element={<Register />} />
                                <Route exact path="/profile" element={<Profile />} />
                                {/*productsInCart={productsInCart} setProductsInCart={setProductsInCart}*/}
                                <Route path="/order" element={<Order  />} />
                            </Routes>
                            <Footer/>
                        </Router>
                    </div>
                </FilterArrayContext.Provider>
            </ProductListContext.Provider>
        </ImmutableProductListContext.Provider>
    )
}

export default App;
