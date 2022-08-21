import React from 'react';
import {Link} from "react-router-dom";
import ProductService from "../../services/ProductService";
import ProductsBySubCategory from "../AllProducts/ProductsBySubCategory";
import Row from "../AllProducts/Row";
import {Context} from "../Context";

const Category = (props) => {
    const [products] = React.useContext(Context);
    console.log(products)
    console.log(props.category)
    let subcategories = ProductService.getSubCategories(products, props.category).map((subCategory, index) => {
        return <ProductsBySubCategory key={index} category={props.category} subCategory={subCategory}/>;
    })

    console.log(subcategories)

    return (
        <div className="categories">
            <Link to={`/${props.category}`}>{props.category}</Link>
        <div className="subcategories">
            {/*<ul>*/}
                {subcategories}
            {/*</ul>*/}
        </div>
        </div>
    )
}
export default Category;