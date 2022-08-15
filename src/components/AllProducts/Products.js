import React, {useState} from 'react';
import ProductCard from "../AllProducts/ProductCard";
import MySelect from "../UI/select/MySelect";
import productData from "../../productData"


const Products = () => {
    const [productList, setProductList] = useState(productData);
    const [sortingKey, setSortingKey] = useState("");
    const [directSort, setDirectSort] = useState(true);

    let products = productList.map(item => {
        return <ProductCard
            key={item.id}
            item={item}
        />
    })

    let sortDate;

    const sortProducts = (field) => {
        setSortingKey(field);
        directSort
            ?
            sortDate = ([...productList].sort(
                (a, b) => a[field] > b[field] ? 1 : -1
            ))
            :
            sortDate = ([...productList].sort(
                (a, b) => a[field] > b[field] ? 1 : -1
            )).reverse();

        setProductList(sortDate);
        setDirectSort(!directSort);
        setSortingKey('');
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
                    {value: 'id', name: "По id"},
                    {value: 'category', name: "По категории"},
                    {value: 'price', name: "По цене"},
            ]}
            />
            <hr/>
            <ul className="products">
                {products}
            </ul>

        </div>
    );
};

export default Products;