import React, {useEffect, useState, useContext} from 'react';
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./header components/Header";
import SingleProduct from "../components/single product components/SingleProduct";
import Footer from "./footer components/Footer";
import Products from "./all products components/Products";
import ProductService from '../services/ProductService'
import {ProductListContext, ImmutableProductListContext} from "../services/Context";
// import CatalogContent from "./CatalogContent";


function App() {
    // let {immutableProductList, setImmutableProductList} = useContext(ImmutableProductListContext);
    // let [immutableProductList, setImmutableProductList] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchField, setSearchField] = useState("");

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = () => {
        ProductService.getAllProducts().then((response) =>{

            setProducts(response.data);
            console.log(products)

        }).catch(error =>{
            console.log(error);
        })
    }

    localStorage.setItem('products', JSON.stringify(products))

    let immutableProductList = JSON.parse(localStorage.getItem('products'))

    console.log(products)
    const handleChange = e => {
        setSearchField(e.target.value);
    };

    const [countProductInBasket, setCountProductInBasket] = useState(0);

    return (
        <ProductListContext.Provider value={{products, setProducts}}>
        <ImmutableProductListContext.Provider value={{immutableProductList}}>
        <div className="container">
            <Router>
            <Header countProductInBasket={countProductInBasket} searchField={searchField} handleChange={handleChange} />
                <Routes>
                    <Route path="/" element={<Products searchField={searchField} />} />
                    <Route path="/product/:id" element={<SingleProduct countProductInBasket={countProductInBasket} setCountProductInBasket={setCountProductInBasket}/>} />
                    <Route path="/:category" element={<Products searchField={searchField} />} />
                    <Route path="/:category/:subcategory" element={<Products searchField={searchField} />} />
                </Routes>
            <Footer/>
            </Router>
        </div>
        </ImmutableProductListContext.Provider>
        </ProductListContext.Provider>
    )
}

export default App;
