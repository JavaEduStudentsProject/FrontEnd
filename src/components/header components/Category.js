import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import ProductService from "../../services/ProductService";
import ProductsBySubCategory from "../AllProducts/ProductsBySubCategory";
import Row from "../AllProducts/Row";
import {FilterArrayContext, ImmutableProductListContext, PriceFilterArrayContext, ProductListContext} from "../Context";
import ProductList from "../../ProductList";

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
        return <ProductsBySubCategory key={index} category={props.category} subCategory={subCategory}/>;
    })

    console.log(subcategories)

    function filterByCategory() {
        filterArray[0] = props.category;
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