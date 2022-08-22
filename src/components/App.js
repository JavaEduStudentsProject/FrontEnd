import React, {useEffect, useState, useContext} from 'react';
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./header components/Header";
import MainContent from "./MainContent";
import Footer from "./footer components/Footer";
import Products from "./AllProducts/Products";
import ProductService from '../services/ProductService'
import {ProductListContext} from "./Context.js";
// import CatalogContent from "./CatalogContent";


function App() {
    const [products, setProducts] = useState([]);
    const [searchField, setSearchField] = useState("");

    useEffect(() => {
        console.log("Вызов useEffect до геттера")
        getAllProducts();
        console.log("Вызов useEffect после геттера")
    }, [])

    const getAllProducts = () => {
        console.log("Вызов геттера")
        ProductService.getAllProducts().then((response) =>{
            setProducts(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }
    console.log(products)

    const handleChange = e => {
        setSearchField(e.target.value);
    };

    const [countProductInBasket, setCountProductInBasket] = useState(0);

    return (
        <ProductListContext.Provider value={[products, setProducts]}>
        <div className="container">
            <Router>
            <Header countProductInBasket={countProductInBasket} searchField={searchField} handleChange={handleChange} />
                <Routes>
                    <Route path="/" element={<Products searchField={searchField} />} />
                    <Route path="/product/:id" element={<MainContent countProductInBasket={countProductInBasket} setCountProductInBasket={setCountProductInBasket}/>} />
                    <Route path="/:category" element={<Products searchField={searchField} />} />
                    <Route path="/:category/:subcategory" element={<Products searchField={searchField} />} />
                </Routes>
            <Footer/>
            </Router>
        </div>
        </ProductListContext.Provider>
    )
}

export default App;
