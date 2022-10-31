import React from 'react';
import ProductCard from "../all products components/ProductCard";

const CosineSimilarityRecommendation = (props) => {
    const allProductList = JSON.parse(localStorage.getItem('immutableProductList'));
    let flag = true;

    let recommendedProducts = null;

    console.log(props.cosineArray)
    console.log(props.cosineArray.length)
    if (props.cosineArray.length > 0) {

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
    } else {
        flag = false
    }
    console.log("flag: " + flag)

    return (
        <div className="additional-recommendations">
            <h1>You may like</h1>
            {flag
                ? <div className="cosine-similarity-recommendation">
                    {recommendedProducts}
                </div>
                : <h3>Try to make at least one order to see these recommendations</h3>
            }
        </div>
    );
};

export default CosineSimilarityRecommendation;