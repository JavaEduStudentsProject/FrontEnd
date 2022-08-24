import React from 'react';
import {ImmutableProductListContext, ProductListContext} from "../../services/Context";
import ProductService from "../../services/ProductService";
import Category from "./Category";
import ProductsBySubCategory from "../all products components/ProductsBySubCategory";

function DropDownMenu() {
    const {products} = React.useContext(ProductListContext);
    const {immutableProductList} = React.useContext(ImmutableProductListContext);
    console.log(immutableProductList)

    let categories = ProductService.getCategories(immutableProductList).map(category =>
                <Category key={category.id} category={category.category}/>
                )

    return (
        <div className="dropdown">
            <button className="dropbtn">Каталог</button>
            <div className="dropdown-content">
                {/*<ul>*/}
                {categories}
                {/*</ul>*/}
            </div>
        </div>
    );
}

export default DropDownMenu;