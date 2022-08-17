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

    return (
        <Context.Provider value={[products, setProducts]}>
        <div className="container">
            <Router>
            <Header searchField={searchField} handleChange={handleChange}/>
                <div>
                <Routes>
                    <Route path="/" element={<Products searchField={searchField}/>} />
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
