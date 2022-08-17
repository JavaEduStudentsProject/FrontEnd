import React, {useState, useContext} from 'react';
import ProductCard from "../AllProducts/ProductCard";
import MySelect from "../UI/select/MySelect";
import Filter from "./Filter";
import Scroll from "./Scroll";
import {Context} from "../Context.js";


const Products = (props) => {

    const [products, setProducts] = useContext(Context);
    const [sortingKey, setSortingKey] = useState("");
    const [directSort, setDirectSort] = useState(true);

    let product = products.filter(item=>{
        const fullFilter= item.title+item.description;
            return fullFilter.includes(props.searchField);
    }).map(item => {
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
            sortDate = ([...products].sort(
                (a, b) => a[field] > b[field] ? 1 : -1
            ))
            :
            sortDate = ([...products].sort(
                (a, b) => a[field] > b[field] ? 1 : -1
            )).reverse();

        setProducts(sortDate);
        setDirectSort(!directSort);
        setSortingKey('');
    }

    return (
        <div className="main-content-products">
            <Filter item={products}/>
            <div className="all-products">
                <h1>Все продукты</h1>
                <hr/>
                <MySelect
                    value={sortingKey}
                    onChange={sortProducts}
                    defaultValue="Сортировка по"
                    options={[
                        {value: 'id', name: "По id"},
                        {value: 'category', name: "По категории"},
                        {value: 'price', name: "По цене"},
                    ]}
                />
                <hr/>
                <Scroll>
                    <ul className="products">
                        {product}
                    </ul>
                </Scroll>
            </div>
        </div>
    );
};

export default Products;