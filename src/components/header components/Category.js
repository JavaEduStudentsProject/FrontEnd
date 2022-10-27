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
    // const {products, setProducts} = React.useContext(ProductListContext);
    // // const {immutableProductList} = React.useContext(ImmutableProductListContext);
    // let subcategories = ProductService.getSubCategories(props.immutable, props.category).map((subCategory, index) => {
    //     return <SubCategory key={index} category={props.category} subCategory={subCategory}/>;
    // })


    function filterByCategory() {
        let newFilterArray = [props.category, ""]
        setFilterArray(newFilterArray);
        // setFilterArray(prevState => prevState.map((item, index) => index === 0 ? props.category : filterArray[index]))
        // filterArray[0] = props.category;
        let renderedProductList = ProductList.filterProducts(immutableProductList, priceDelta, filterArray);

        // setProducts(renderedProductList);


        // if (document.getElementById("link-to-category").style.display === "block") {
        //     document.getElementById("link-to-category").style.display = "none";
        // }
        // else {
        //     document.getElementById("link-to-category").style.display = "block";
        // }

    }

    // function filterByCategory() {
    //     filterArray[0] = props.category;
    //     filterArray[1] = "";
    //     let renderedProductList = ProductList.filterProducts(props.immutable, priceDelta, filterArray);
    //     localStorage.setItem(`${props.category}`, JSON.stringify(renderedProductList))
    //     setProducts(JSON.parse(localStorage.getItem(`${props.category}`)));
    //     console.log(products)
    // }

    return (
        <div className="categories">
            <Link to={`/${props.category}`}
                  onClick={filterByCategory}
                  id="link-to-category">{props.category}</Link>
            <div className="subcategories">
                {/*<ul>*/}
                {subcategories}
                {/*</ul>*/}
            </div>
        </div>
    )
}
export default Category;