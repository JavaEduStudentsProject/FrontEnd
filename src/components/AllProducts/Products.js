import React, {useContext} from 'react';
import ProductCard from "../AllProducts/ProductCard";
import Filter from "./Filter";
import Scroll from "./Scroll";
import {Context} from "../Context.js";
import {useParams} from "react-router-dom";
import Title from "../UI/select/Title";
import Sort from "../UI/select/Sort";
import Hr from "../UI/select/Hr";


const Products = (props) => {
    let product=[];
    const [products] = useContext(Context);
    const {category} = useParams();

  if (category) {
            product = products.filter(p => p.category === category).filter(item => {
                const fullFilter = item.title + item.description;
                return fullFilter.toLowerCase().includes(props.searchField.toLowerCase());
            })

  } else {
            product = products.filter(item => {
                const fullFilter = item.title + item.description + item.category;
                return fullFilter.toLowerCase().includes(props.searchField.toLowerCase());
  })
}

    let product1=product.map(item => {
        return <ProductCard
            key={item.id}
            item={item}
        />
    })

    return (
        <div className="main-content-products">
            <Filter item={products} category={category}/>
            <div className="all-products">
                <Title category={category}/>
                <Hr item={category}/>
                <Sort category={category}/>
                <Hr item={category}/>
                <Scroll>
                    <ul className="products">
                        {product1}
                    </ul>
                </Scroll>
            </div>
        </div>
    );
};

export default Products;