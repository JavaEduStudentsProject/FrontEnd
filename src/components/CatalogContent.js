import React, {useContext} from "react";
import {Context} from "./Context";
import ProductCard from "./AllProducts/ProductCard";
import Filter from "./AllProducts/Filter";
import Scroll from "./AllProducts/Scroll";
import {useParams} from "react-router-dom";




export default function CatalogContent() {
    const [products, setProducts] = useContext(Context);

    const {category} = useParams();

    let product = products.filter(p=>p.category===category)
        .map(item => {
        return <ProductCard
            key={item.id}
            item={item}
        />
    })
    return (
        <div className="main-content-products">
            <Filter item={products}/>
            <div className="all-products">
                <h1>Все продукты</h1>

                <Scroll>
                    <ul className="products">
                        {product}
                    </ul>
                </Scroll>
            </div>
        </div>
    );
};