import React, {useEffect, useState} from 'react';
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./header components/Header";
import MainContent from "./MainContent";
import Footer from "./footer components/Footer";
import Products from "./AllProducts/Products";
import ProductService from '../services/ProductService'
import {Context} from "./Context.js";


function App() {
    const [products, setProducts] = useState([]);
    const [searchField, setSearchField] = useState("");

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = () => {
        ProductService.getAllProducts().then((response) =>{
            setProducts(response.data)
        }).catch(error =>{
            console.log(error);
        })
    }
    const handleChange = e => {
        setSearchField(e.target.value);
    };

    const [countProductInBasket, setCountProductInBasket] = useState(0);

    return (
        <Context.Provider value={[products, setProducts]}>
        <div className="container">
            <Router>

            <Header countProductInBasket={countProductInBasket} products={productData}/>
                <Routes>
                    <Route path="/" element={<Products products={productData}/>} />
                    <Route path="/product/:id" element={<MainContent countProductInBasket={countProductInBasket} setCountProductInBasket={setCountProductInBasket} products={productData}/>} />

                </Routes>
            <Footer/>
            </Router>
        </div>
        </Context.Provider>
    )
}

export default App;
