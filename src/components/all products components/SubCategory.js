import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import ProductList from "../../services/ProductList";
import {
    FilterArrayContext,
    ImmutableProductListContext,
    PriceFilterArrayContext,
    ProductListContext
} from "../../services/Context";

const SubCategory = (props) => {
    const {filterArray} = useContext(FilterArrayContext);
    // const {products, setProducts} = React.useContext(ProductListContext);
    const {immutableProductList} = React.useContext(ImmutableProductListContext);
    const {priceDelta} = useContext(PriceFilterArrayContext);
    // let immutable = JSON.parse(localStorage.getItem('immutableProductList'))

    function filterBySubCategory() {
        filterArray[0] = props.category;
        filterArray[1] = props.subCategory;
        let renderedProductList = ProductList.filterProducts(immutableProductList, priceDelta, filterArray);
        console.log("Лист продуктов для рендеринга после фильтрации по субкатегории")
        console.log(renderedProductList)
        // setProducts(renderedProductList);
        // let renderedProductList = ProductList.filterProducts(immutable, priceDelta, filterArray);
        //
        // localStorage.setItem(`${props.subCategory}`, JSON.stringify(renderedProductList))
        // setProducts(JSON.parse(localStorage.getItem(`${props.subCategory}`)));
        // console.log(products)
    }
    return(
        <Link to = {`/${props.category}/${props.subCategory}`}
              onClick={filterBySubCategory}>{props.subCategory}</Link>
    )
};


export default SubCategory;