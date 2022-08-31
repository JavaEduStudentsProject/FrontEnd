import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import ProductService from "../../services/ProductService";
import SubCategory from "../all products components/SubCategory";
import Row from "../all products components/Row";
import {
    FilterArrayContext,
    ImmutableProductListContext,
    PriceFilterArrayContext,
    ProductListContext
} from "../../services/Context";
import ProductList from "../../services/ProductList";

const Category = (props) => {
    const {filterArray, setFilterArray} = useContext(FilterArrayContext);
    const {priceDelta} = useContext(PriceFilterArrayContext);
    // const {products, setProducts} = React.useContext(ProductListContext);
    const {immutableProductList} = React.useContext(ImmutableProductListContext);
    let subcategories = ProductService.getSubCategories(immutableProductList, props.category).map((subCategory, index) => {
            return <SubCategory key={index} category={props.category} subCategory={subCategory}/>;
        })


        function filterByCategory() {
            let newFilterArray = [props.category, ""]
            setFilterArray(newFilterArray);
            // setFilterArray(prevState => prevState.map((item, index) => index === 0 ? props.category : filterArray[index]))
            // filterArray[0] = props.category;
            console.log(filterArray);
            let renderedProductList = ProductList.filterProducts(immutableProductList, priceDelta, filterArray);
            console.log("Лист продуктов для рендеринга после фильтрации по категории")
            console.log(renderedProductList)
            // setProducts(renderedProductList);
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