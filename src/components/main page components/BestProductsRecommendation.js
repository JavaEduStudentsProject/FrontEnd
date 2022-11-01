import React, {useContext, useEffect, useState} from "react";
import {ImmutableProductListContext} from "../../services/Context";
import Title from "../all products components/Title";
import ProductCard from "../all products components/ProductCard";



const BestProductsRecommendation = (props) => {
    const immutableProductList = JSON.parse(localStorage.getItem('immutableProductList'));
    // const [recommendations, setRecommendations] = useState(JSON.stringify({'electronics': [1, 6, 9, 2],
    //     'beauty and health': [16, 15, 13, 18],
    //     'food': [24, 25, 23, 22],
    //     'House and garden': [30, 28, 32, 29],
    //     ' clothing': [64, 40, 57, 55],
    //     ' decorations': [85, 83, 81, 75],
    //     ' auto': [88, 93, 86, 87],
    //     ' House and garden ': [98, 97, 96, 100]})
    // );

    const recommendations = JSON.stringify(props.bestProductArray);

    //Обрабатываем входные данные
    console.log("ImmutablePL");
    console.log(immutableProductList)


    const cardIdsArray = Object.values(JSON.parse(recommendations)).reduce((acc, value) => {
        acc.push(value);
        return acc;
    }, []);

    console.log("first step");
    console.log(cardIdsArray);

    //Делаем нормальный формат данных
    const recomms = Object.keys(JSON.parse(recommendations)).reduce((acc, key) => {
        acc.push({
            name: key,
            id: JSON.parse(recommendations)[key]
        })
        return acc
    },[])

    console.log("second step");
    console.log(recomms);

    const productsToRender = recomms.map(section => {
        const ids = section.id;
        section.id = section.id.map((id, index) => {
            return immutableProductList.find(elem => elem.id === id)
        })
        return section
    })

    // const productsToRender = immutableProductList.filter(product => {
    //     if (cardIdsArray.includes(product.id)) {
    //         return true
    //     }
    // })

    // console.log(productsToRender)


    // for (let item of items) {
    //
    // }
    //
    // for (let key in obj) {
    //
    // }
    // const filteredList = immutableProductList.filter()


    return (
        <div className="recommended-products">
            <h1>Лидеры оценок пользователей</h1>

            <div className="products-on-main">
                {productsToRender.map((elem, index) => {
                    return (<div  key={index}>
                        <h1>{elem.name}</h1>
                        <div className="best-products-recommendation">
                        {elem.id.map(product => <ProductCard item={product} key={product.id}/>)}
                        </div>
                    </div>)
                })}
            </div>
            <div>
                {/*{productsToRender.map(product => <ProductCard key={product.id} item={product}/>)}*/}
            </div>

            {/*<div >*/}
            {/*    /!*{Object.keys(JSON.parse(recommendations)).map((key) => <div>{JSON.parse(recommendations)[key].join(',')}</div>)}*!/*/}
            {/*</div>*/}
            {/*<div >*/}
            {/*    /!*{Object.keys(JSON.parse(recommendations)).map((key) => <div>{key}</div>)}*!/*/}
            {/*</div>*/}
        </div>
    );

}
export default BestProductsRecommendation