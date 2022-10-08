import React, {useEffect, useState, useMemo} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./header components/Header";
import SingleProduct from "../components/single product components/SingleProduct";
import Footer from "./footer components/Footer";
import Products from "./all products components/Products";
import ProductService from '../services/ProductService'
import {ImmutableProductListContext, FilterArrayContext, ProductListContext} from "../services/Context";
import ProductList from "../services/ProductList";
import {useLocalStorage} from "../hooks/useLocalStorage";

function App() {
    const [immutableProductList, setImmutableProductList] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [filterArray, setFilterArray] = useState(["", ""]);
    const [countProductInBasket, setCountProductInBasket] = useState(0);
    const [order, setOrder] = useLocalStorage([], "order")

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

//запустить один раз и закомментировать
    // localStorage.setItem('immutableProductList', JSON.stringify(immutableProductList))

    const handleChange = e => {
        setSearchField(e.target.value);
    };

    const {productArray} = useMemo(() => {
        let productArray = [];
        productArray.push(ProductList.search(immutableProductList, searchField))
        return {productArray}
    }, [searchField])

    const addToOrder = (id) => {
        let isInArray = false;
        const newItem = immutableProductList.find((item) => item.id === id);
        // let newItemTemp=[{
        //     id:newItem.id,
        //     title:newItem.title,
        //     image:newItem.price,
        //     discountPercentage:newItem["non-filter_features"]["discountPercentage"],
        //     quantity:1
        // }]
        order.forEach(el => {
            if (el.id === id)
                isInArray = true;
        })
        if (!isInArray)

            setOrder([...order, newItem])
    };

    const deleteOrder = (id) => {
        const orderTemp=order.filter(el=>el.id!==id)
        setOrder(orderTemp)
    };

    return (
        <ImmutableProductListContext.Provider value={{immutableProductList}}>
            <ProductListContext.Provider value={{productArray}}>
                <FilterArrayContext.Provider value={{filterArray, setFilterArray}}>
                    <div className="container">
                        <Router>
                            <Header order={order} setOrder={setOrder} deleteOrder={deleteOrder}
                                    countProductInBasket={countProductInBasket}
                                    searchField={searchField}
                                    handleChange={handleChange}/>
                            <Routes>
                                <Route path="/product/:id"
                                       element={<SingleProduct countProductInBasket={countProductInBasket}
                                                               deleteOrder={deleteOrder} addToOrder={addToOrder}
                                                               setCountProductInBasket={setCountProductInBasket}/>}/>
                                <Route path="/:category/:subcategory" element={<Products searchField={searchField}
                                                                                         deleteOrder={deleteOrder}
                                                                                         addToOrder={addToOrder}/>}/>
                                <Route path="/:category" element={<Products searchField={searchField}
                                                                            deleteOrder={deleteOrder}
                                                                            addToOrder={addToOrder}/>}/>
                                <Route path="/" element={<Products searchField={searchField}
                                                                   deleteOrder={deleteOrder}
                                                                   addToOrder={addToOrder}/>}/>
                            </Routes>
                            <Footer/>
                        </Router>
                    </div>
                </FilterArrayContext.Provider>
            </ProductListContext.Provider>
        </ImmutableProductListContext.Provider>
    )
}

export default App;
