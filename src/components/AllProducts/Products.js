import React, {useState} from 'react';
import ProductCard from "../AllProducts/ProductCard";
import MySelect from "../UI/select/MySelect";
import Scroll from "./Scroll";


const Products = (props) => {

  const [sortingKey, setSortingKey] = useState("");

    const [directSort, setDirectSort] = useState(true);
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