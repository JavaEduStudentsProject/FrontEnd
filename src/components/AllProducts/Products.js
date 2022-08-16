import React, {useState} from 'react';
import ProductCard from "../AllProducts/ProductCard";
import MySelect from "../UI/select/MySelect";
import Scroll from "./Scroll";


const Products = (props) => {


  const [sortingKey, setSortingKey] = useState("");
    const [directSort, setDirectSort] = useState(true);
    let sortDate;



    // const sortProducts = (sort) => {
    //     setSortingKey(sort);
    //     // /todo найти универсальную функцию для сравнения не только строк, а всех типов значений
    //     setProducts([...products].sort((a, b) => a[sort].localeCompare(b[sort])));
    // }
    const sortProducts = (field) => {
        directSort
            ?
            sortDate = props.products.concat().sort(
                (a, b) => {
                    return a[field]>b[field] ? 1 : -1
                }
            )
            :
            sortDate = props.products.concat().reverse(
                (a, b) => {
                    return a[field]>b[field] ? 1 : -1
                }
            )
        // setProducts(sortDate);
        setDirectSort(!directSort);
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
            <Scroll >
            <ul className="products">
                {props.products.map(product =>
                    <ProductCard product = {product} key={product.id}/>
                )}
            </ul>
            </Scroll>

        </div>
    );
};

export default Products;