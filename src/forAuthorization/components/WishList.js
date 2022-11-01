import ProductCard from "../../components/all products components/ProductCard";
import React from "react";

const WishList = ()=>{

    const products = JSON.parse(localStorage.getItem('wishList'))

    return(
        <div className="main-content-products">
            <div className="all-products">
                <div className="products">
        {products.map(product=>


                        <ProductCard
                    key={product.id}
                    item={product}

                />

                )
        }
                </div>
            </div>
    </div>
    )
}
export default WishList