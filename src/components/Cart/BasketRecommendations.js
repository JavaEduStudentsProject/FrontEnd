import React from 'react';
import ProductCard from "../all products components/ProductCard";
import {useState} from "@types/react";

const BasketRecommendations = (props) => {
    const allProductList = JSON.parse(localStorage.getItem('immutableProductList'));
    const [recommendations, setRecommendations] = useState(JSON.stringify([1, 2, 3, 4]));

    const recommendedProductsArray = allProductList.filter(product => recommendations.cosineArray.includes(product.id));
    const recommendedProducts = recommendedProductsArray.map(product => {
        return <ProductCard
            key={product.id}
            item={product}

        />
    })
    return (
        <div>
            <h1>Here will be recommendationArray:</h1>
            <div className="best-products-recommendation">
                {recommendedProducts}
            </div>
        </div>
    );
};

export default BasketRecommendations;