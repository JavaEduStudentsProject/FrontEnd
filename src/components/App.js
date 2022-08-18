import React, {useEffect, useState} from 'react';
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./header components/Header";
import MainContent from "./MainContent";
import Footer from "./footer components/Footer";
import Products from "./AllProducts/Products";
// import ProductService from '../services/ProductService'
import productData from "../productData"

function App() {
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     getAllProducts();
    // }, [])

    // const getAllProducts = () => {
    //     ProductService.getAllProducts().then((response) =>{
    //         // setProducts(response.data)
    //         // console.log(response.data);
    //     }).catch(error =>{
    //         console.log(error);
    //     })
    // }

    const [countProductInBasket, setCountProductInBasket] = useState(0);

    return (
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
    )
}

export default App;
