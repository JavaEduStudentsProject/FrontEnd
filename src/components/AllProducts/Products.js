import React, {useState} from 'react';
import ProductCard from "../AllProducts/ProductCard";

const Products = () => {
    const [products, setProducts] = useState([
        {id: 1, category: "robot", name: "R2D2", mainFunction: "Calculation", preview: "../../images/img_3.jpg"},
        {id: 2, category: "robot", name: "Bender", mainFunction: "Drinking", preview: "../../images/img_3.jpg"},
        {id: 3, category: "robot", name: "21-A", mainFunction: "Massacre", preview: "../../images/img_3.jpg"},
        {id: 4, category: "table", name: "handMadeTable", size: "M", preview: "../../images/img_3.jpg"},
        {id: 5, category: "table", name: "ikeaTable", size: "L", preview: "../../images/img_3.jpg"},
    ])
    return (
        <div>
            <h1>Все продукты</h1>
            <a href="http://localhost:3000/product">Конкретный продукт</a>
            <ul className="products">
                {products.map(product =>
                    <ProductCard product = {product} key={product.id}/>
                )}
            </ul>
        </div>
    );
};

export default Products;