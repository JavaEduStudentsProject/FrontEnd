import React from 'react';
import ProductCard from "../all products components/ProductCard";

const CosineSimilarityRecommendation = (props) => {
    const allProductList = JSON.parse(localStorage.getItem('immutableProductList'));

    const recommendedProductsArray = allProductList.filter(product => props.cosineArray.includes(product.id));

    const recommendedProducts = recommendedProductsArray.map(product => {
        return <ProductCard
            key={product.id}
            item={product}
            // addProductInCart={props.addProductInCart}
            // deletePurchasedProduct={props.deletePurchasedProduct}
            // incrementProductCount={props.incrementProductCount}
            // decrementProductCount={props.decrementProductCount}
        />
    })

    return (
        <div>
            <h1>Here will be recommendationArray:</h1>
            <div className="cosine-similarity-recommendation">
                {recommendedProducts}
            </div>
        </div>
    );
};

export default CosineSimilarityRecommendation;