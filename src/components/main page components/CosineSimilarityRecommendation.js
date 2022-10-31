import React from 'react';
import ProductCard from "../all products components/ProductCard";
import Scroll_Horizontal from "../all products components/Scroll_Horizontal";

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
            <h1>Рекомендуемые товары</h1>
            <Scroll_Horizontal>
                <div className="cosine-similarity-recommendation">
                        {recommendedProducts}
                </div>
            </Scroll_Horizontal>
        </div>
    );
};

export default CosineSimilarityRecommendation;