import React, {useEffect, useState, useContext, use} from 'react';
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import {BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom';

import Header from "./header components/Header";
import SingleProduct from "../components/single product components/SingleProduct";
import Footer from "./footer components/Footer";
import Products from "./all products components/Products";
import ProductService from '../services/ProductService'
import {
    ProductListContext,
    ImmutableProductListContext,
    FilterArrayContext,
    PriceFilterArrayContext
} from "../services/Context";
import ProductList from "../services/ProductList";

// import CatalogContent from "./CatalogContent";


function App() {
    console.log(useContext(ImmutableProductListContext));
    // let {immutableProductList, setImmutableProductList} = useContext(ImmutableProductListContext);
    let [immutableProductList, setImmutableProductList] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchField, setSearchField] = useState("");

    const {filterArray} = useContext(FilterArrayContext);
    const {priceDelta} = useContext(PriceFilterArrayContext);

    const {category, subcategory} = useParams();
    console.log(useParams())
    console.log(category)
    console.log(subcategory)

    console.log(useContext(ImmutableProductListContext));

    useEffect(() => {
        console.log("Вызов useEffect до геттера")
        getAllProducts();
        console.log("Вызов useEffect после геттера")
    }, [])

    const getAllProducts = () => {
        console.log("Вызов геттера")
        ProductService.getAllProducts().then((response) => {
            setImmutableProductList(response.data);
            // immutableProductList = response.data;
            if (!category) {
                setProducts(response.data);
            }
            console.log("Тест респонс даты: " + response.data)
        }).catch(error => {
            console.log(error);
        })
    }
    console.log("Test IPL " + immutableProductList);

    const handleChange = e => {
        setSearchField(e.target.value);
    };

    const [countProductInBasket, setCountProductInBasket] = useState(0);

    // setProducts(ProductList.filterProducts(products, filterArray, priceDelta));

    return (
        <ProductListContext.Provider value={{products, setProducts}}>
            <ImmutableProductListContext.Provider value={{immutableProductList}}>
                <div className="container">
                    <Router>
                        <Header countProductInBasket={countProductInBasket} searchField={searchField}
                                handleChange={handleChange}/>
                        <Routes>
                            <Route path="/" element={<Products searchField={searchField}/>}/>
                            <Route path="/product/:id"
                                   element={<SingleProduct countProductInBasket={countProductInBasket}
                                                           setCountProductInBasket={setCountProductInBasket}/>}/>
                            <Route path="/:category" element={<Products searchField={searchField}/>}/>
                            <Route path="/:category/:subcategory" element={<Products searchField={searchField}/>}/>
                        </Routes>
                        <Footer/>
                    </Router>
                </div>
            </ImmutableProductListContext.Provider>
        </ProductListContext.Provider>
    )
}

export default App;
