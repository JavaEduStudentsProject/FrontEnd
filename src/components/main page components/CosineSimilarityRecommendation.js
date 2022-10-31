import React from 'react';
import ProductCard from "../all products components/ProductCard";

const CosineSimilarityRecommendation = (props) => {
    const allProductList = JSON.parse(localStorage.getItem('immutableProductList'));

    let recommendedProducts = null;

    console.log(props.cosineArray)
    console.log(props.cosineArray.length)

    const recommendedProductsArray = allProductList.filter(product => props.cosineArray.includes(product.id));

    recommendedProducts = recommendedProductsArray.map(product => {
        return <ProductCard
            key={product.id}
            item={product}
            addProductInCart={props.addProductInCart}
            deletePurchasedProduct={props.deletePurchasedProduct}
            incrementProductCount={props.incrementProductCount}
            decrementProductCount={props.decrementProductCount}
        />
    })


    return (
        <div>
            <h1>You can like</h1>
            <div className="cosine-similarity-recommendation">
                    {recommendedProducts}
            </div>
        </div>
    );
};

export default CosineSimilarityRecommendation;