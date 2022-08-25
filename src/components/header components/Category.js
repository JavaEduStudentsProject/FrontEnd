import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import ProductService from "../../services/ProductService";
import SubCategory from "../all products components/SubCategory";
import Row from "../all products components/Row";
import {FilterArrayContext, ImmutableProductListContext, PriceFilterArrayContext, ProductListContext} from "../../services/Context";
import ProductList from "../../services/ProductList";

const Category = (props) => {
    const {filterArray} = useContext(FilterArrayContext);
    console.log(filterArray)
    const {priceDelta} = useContext(PriceFilterArrayContext);
    console.log(priceDelta)
    const {products, setProducts} = React.useContext(ProductListContext);
    const {immutableProductList} = React.useContext(ImmutableProductListContext);
    console.log(products)
    console.log(props.category)
    let subcategories = ProductService.getSubCategories(immutableProductList, props.category).map((subCategory, index) => {
        return <SubCategory key={index} category={props.category} subCategory={subCategory}/>;
    })

    console.log(subcategories)

    function filterByCategory() {
        filterArray[0] = props.category;
        filterArray[1] = "";
        let renderedProductList = ProductList.filterProducts(immutableProductList, priceDelta, filterArray);
        console.log("Лист продуктов для рендеринга после фильтрации по категории")
        console.log(renderedProductList)
        setProducts(renderedProductList);
    }

    return (
        <div className="categories">
            <Link to={`/${props.category}`}
                  onClick={filterByCategory}>{props.category}</Link>
        <div className="subcategories">
            {/*<ul>*/}
                {subcategories}
            {/*</ul>*/}
        </div>
        </div>
    )
}
export default Category;