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
    const [productsInCart, setProductsInCart] = useLocalStorage([], "productsInCart")

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

    const addProductInCart = (id) => {
        let isInArray = false;
        const newItem = immutableProductList.find((item) => item.id === id);
        // let newItemTemp=[{
        //     id:newItem.id,
        //     title:newItem.title,
        //     image:newItem.price,
        //     discountPercentage:newItem["non-filter_features"]["discountPercentage"],
        //     quantity:1
        // }]
        productsInCart.forEach(el => {
            if (el.id === id)
                isInArray = true;
        })
        if (!isInArray)

            setProductsInCart([...productsInCart, newItem])
    };

    const deleteProductInCart = (id) => {
        const productsInCartTemp=productsInCart.filter(el=>el.id!==id)
        setProductsInCart(productsInCartTemp)
    };

    return (
        <ImmutableProductListContext.Provider value={{immutableProductList}}>
            <ProductListContext.Provider value={{productArray}}>
                <FilterArrayContext.Provider value={{filterArray, setFilterArray}}>
                    <div className="container">
                        <Router>
                            <Header productsInCart={productsInCart} setProductsInCart={setProductsInCart} deleteProductInCart={deleteProductInCart}
                                    countProductInBasket={countProductInBasket}
                                    searchField={searchField}
                                    handleChange={handleChange}/>
                            <Routes>
                                <Route path="/product/:id"
                                       element={<SingleProduct countProductInBasket={countProductInBasket}
                                                               deleteProductInCart={deleteProductInCart} addProductInCart={addProductInCart}
                                                               setCountProductInBasket={setCountProductInBasket}/>}/>
                                <Route path="/:category/:subcategory" element={<Products searchField={searchField}
                                                                                         deleteProductInCart={deleteProductInCart}
                                                                                         addProductInCart={addProductInCart}/>}/>
                                <Route path="/:category" element={<Products searchField={searchField}
                                                                            deleteProductInCart={deleteProductInCart}
                                                                            addProductInCart={addProductInCart}/>}/>
                                <Route path="/" element={<Products searchField={searchField}
                                                                   deleteProductInCart={deleteProductInCart}
                                                                   addProductInCart={addProductInCart}/>}/>
                                <Route exact path="/login" element={<Login />} />
                                <Route exact path="/register" element={<Register />} />
                                <Route exact path="/profile" element={<Profile />} />
                                <Route path="/order" element={<Order productsInCart={productsInCart} setProductsInCart={setProductsInCart}/>} />

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
