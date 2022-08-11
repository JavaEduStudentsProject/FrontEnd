import React, {useState} from 'react';
import ProductCard from "../AllProducts/ProductCard";
import MySelect from "../UI/select/MySelect";

const Products = () => {
    const [products, setProducts] = useState([
        {id: 1, category: "robot", name: "R2D2", mainFunction: "Calculation", price: "100", preview: "../../images/img_3.jpg"},
        {id: 2, category: "robot", name: "Bender", mainFunction: "Drinking", price: "999", preview: "../../images/img_3.jpg"},
        {id: 3, category: "table", name: "ironTable", size: "M", price: "100", preview: "../../images/img_3.jpg"},
        {id: 4, category: "robot", name: "21-A", mainFunction: "Massacre", price: "999", preview: "../../images/img_3.jpg"},
        {id: 5, category: "table", name: "handMadeTable", size: "M", price: "333", preview: "../../images/img_3.jpg"},
        {id: 6, category: "table", name: "ikeaTable", size: "L", price: "333", preview: "../../images/img_3.jpg"},
    ])

    const [sortingKey, setSortingKey] = useState("");

    const sortProducts = (sort) => {
        setSortingKey(sort);
        // /todo найти универсальную функцию для сравнения не только строк, а всех типов значений
        setProducts([...products].sort((a, b) => a[sort].localeCompare(b[sort])));
    }

    return (
        <div className="all-products">
            <h1>Все продукты</h1>
            <hr/>
            <MySelect
                value={sortingKey}
                onChange={sortProducts}
                defaultValue="Сортировка по"
                options = {[
                    // {value: 'id', name: "По id"},
                    {value: 'category', name: "По категории"},
                    {value: 'price', name: "По цене"},
            ]}
            />
            <hr/>
            <ul className="products">
                {products.map(product =>
                    <ProductCard product = {product} key={product.id}/>
                )}
            </ul>

        </div>
    );
};

export default Products;