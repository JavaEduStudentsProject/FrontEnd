import React, {useState} from 'react';
import ProductCard from "../all products components/ProductCard";


const BasketRecommendations = (props) => {
    const allProductList = JSON.parse(localStorage.getItem('immutableProductList'));
    const [recommendations, setRecommendations] = useState(JSON.stringify([1, 2, 3, 4]));

    const recommendedProductsArray = allProductList.filter(product => recommendations.includes(product.id));
    const recommendedProducts = recommendedProductsArray.map(product => {
        return <ProductCard
            key={product.id}
            item={product}

        />
    })
    return (
        <div>
            <h3>You can like thees products</h3>
            <div className="best-products-recommendation">
                {recommendedProducts}
            </div>
        </div>
    );
};

export default BasketRecommendations;