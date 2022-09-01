import React, {useEffect, useState, useContext} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./header components/Header";
import SingleProduct from "../components/single product components/SingleProduct";
import Footer from "./footer components/Footer";
import Products from "./all products components/Products";
import ProductService from '../services/ProductService'
import {ImmutableProductListContext, FilterArrayContext} from "../services/Context";

// import CatalogContent from "./CatalogContent";

function App() {
    const [productArray, setProductArray] = useState([]);
    const [immutableProductList, setImmutableProductList] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [filterArray, setFilterArray] = useState(["", ""]);

    const [countProductInBasket, setCountProductInBasket] = useState(0);

    useEffect(() => {
        console.log("Вызов useEffect до геттера")
        getAllProducts();
        console.log("Вызов useEffect после геттера")
    }, [])

    const getAllProducts = () => {
        console.log("Вызов геттера")
        ProductService.getAllProducts().then((response) => {
            setImmutableProductList(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <ImmutableProductListContext.Provider value={{immutableProductList}}>
                <FilterArrayContext.Provider value={{filterArray, setFilterArray}}>
                    <div className="container">
                        <Router>
                            <Header countProductInBasket={countProductInBasket} searchField={searchField}
                                setSearchField={setSearchField} setProductArray={setProductArray}/>
                            <Routes>
                                <Route path="/product/:id" element={<SingleProduct countProductInBasket={countProductInBasket}
                                    setCountProductInBasket={setCountProductInBasket}/>}/>
                                <Route path="/:category/:subcategory" element={<Products searchField={searchField}
                                    productArray={productArray} setProductArray={setProductArray}/>}/>
                                <Route path="/:category" element={<Products searchField={searchField}
                                    productArray={productArray} setProductArray={setProductArray}/>}/>
                                <Route path="/" element={<Products searchField={searchField}
                                    productArray={productArray} setProductArray={setProductArray}/>}/>
                            </Routes>
                            <Footer/>
                        </Router>
                    </div>
                </FilterArrayContext.Provider>
        </ImmutableProductListContext.Provider>
    )
}

export default App;
