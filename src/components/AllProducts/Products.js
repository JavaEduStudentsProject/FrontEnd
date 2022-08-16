import React, {useState} from 'react';
import ProductCard from "../AllProducts/ProductCard";
import MySelect from "../UI/select/MySelect";
// import productData from "../../productData"
import Filter from "./Filter";
import Scroll from "./Scroll";


const Products = (props) => {
    const [productList, setProductList] = useState(props.products);
    const [sortingKey, setSortingKey] = useState("");
    const [directSort, setDirectSort] = useState(true);

    // let products = productList.map(item => {
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
        <div className="main-content-products">
            <Filter item={productList}/>
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
            <Scroll >
            <ul className="products">
                {products}
            </ul>
            </Scroll>

        </div>
        </div>
    );
};

export default Products;