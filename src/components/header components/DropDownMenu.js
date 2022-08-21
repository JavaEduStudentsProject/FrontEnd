import React from 'react';
import {Context} from "../Context";
import ProductService from "../../services/ProductService";
import Category from "./Category";
import ProductsBySubCategory from "../AllProducts/ProductsBySubCategory";

function DropDownMenu() {
    const [products] = React.useContext(Context);

    let categories = ProductService.getCategories(products).map(category =>
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