import React, {useState} from 'react';
import ProductCard from "../all products components/ProductCard";


const BasketRecommendations = (props) => {
    const allProductList = JSON.parse(localStorage.getItem('immutableProductList'));
    let flag = true;

    let recommendedProducts = null;

    console.log(props.basketCategoriesArray)
    console.log(props.basketCategoriesArray.length)
    if (props.basketCategoriesArray.length > 0) {

        const recommendedProductsArray = allProductList.filter(product => props.basketCategoriesArray.includes(product.id));

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
        <div>
            <h3>You can like</h3>
            {flag &&
                <div className="cosine-similarity-recommendation">
                    {recommendedProducts}
                </div>
            }
        </div>
    );
};

export default BasketRecommendations;