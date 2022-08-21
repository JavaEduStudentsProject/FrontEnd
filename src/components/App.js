import React, {useEffect, useState} from 'react';
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./header components/Header";
import MainContent from "./MainContent";
import Footer from "./footer components/Footer";
import Products from "./AllProducts/Products";
import ProductService from '../services/ProductService'
import {Context} from "./Context.js";
import ProductsBySubCategory from "./AllProducts/ProductsBySubCategory";
import ProductList from "../ProductList";
// import CatalogContent from "./CatalogContent";


function App() {

    let one = {
        one: 1,
        two: 2
    }

    let two = {
        three: 3,
        four: 4
    }

    one = Object.assign(one, two)

    console.log(one)

    let obj = {
        "id": 10,
        "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
        "category": "electronics",
        "filter_features":
        {
            "price": 109,
            "subCategory": "hard drives",
            "memory": "1 Tb"
        },
        "non-filter_features": {
        "rating": {
            "rate": 2.9,
                "count": 470
        },
        "producer": "WD",
            "color": "white"
    },
        "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
        "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
    }

    console.log(obj);
    console.log(ProductList.flatProduct(obj));



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

            <Header countProductInBasket={countProductInBasket} searchField={searchField} handleChange={handleChange} />
                <Routes>
                    <Route path="/" element={<Products searchField={searchField} />} />
                    <Route path="/product/:id" element={<MainContent countProductInBasket={countProductInBasket} setCountProductInBasket={setCountProductInBasket}/>} />
                    <Route path="/:category" element={<Products searchField={searchField} />} />
                    <Route path="/:category/:subcategory" element={<ProductsBySubCategory searchField={searchField} />} />
                </Routes>
            <Footer/>
            </Router>
        </div>
        </Context.Provider>
    )
}

export default App;
