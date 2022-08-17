import React, {useEffect, useState} from 'react';
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./header components/Header";
import MainContent from "./MainContent";
import Footer from "./footer components/Footer";
import Products from "./AllProducts/Products";
import ProductService from '../services/ProductService'
import productData from "../productData"
import {Context} from "./Context.js";


function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = () => {
        ProductService.getAllProducts().then((response) =>{
            setProducts(response.data)
            // console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    return (
        <Context.Provider value={[products, setProducts]}>
        <div className="container">
            <Router>
            <Header />
                <div>
                <Routes>
                    <Route path="/" element={<Products />} />
                    <Route path="/product/:id" element={<MainContent />} />
                </Routes>
                </div>
            <Footer/>
            </Router>
        </div>
        </Context.Provider>
    )
}

export default App;
