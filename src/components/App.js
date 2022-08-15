import React from 'react';
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./header components/Header";
import MainContent from "./MainContent";
import Footer from "./footer components/Footer";
import Products from "./AllProducts/Products";

function App() {
    return (
        <div className="container">
            <Router>
            <Header/>
                <div>
                <Routes>
                    <Route path="/" element={<Products/>} />
                    <Route path="product" element={<MainContent/>} />
                </Routes>
                </div>
            <Footer/>
            </Router>
        </div>
    )
}

export default App;
