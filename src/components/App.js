import React from 'react';
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Header from "./header components/Header";
import MainContent from "./MainContent";
import Footer from "./footer components/Footer";
import Products from "./AllProducts/Products";

function App() {
    return (
        <div className="App">
            <Header/>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Products/>} />
                    <Route path="product" element={<MainContent/>} />
                </Routes>
            </BrowserRouter>

            {/*<Router>*/}
            {/*    <Link to="/">Все продукты</Link>*/}
            {/*    <Link to="/about">Продукт</Link>*/}
            {/*    /!*<Routes>*!/*/}
            {/*    <Route path="/" component={Products} />*/}
            {/*    <Route path="/product" component={MainContent} />*/}
            {/*    /!*</Routes>*!/*/}

            {/*</Router>*/}

            {/*<Products/>*/}
            {/*<MainContent/>*/}
            <Footer/>
        </div>
    )
}

export default App;
