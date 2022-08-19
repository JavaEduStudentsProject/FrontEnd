import React from 'react';
import {Context} from "../Context";
import ProductService from "../../services/ProductService";
import Category from "./Category";

function DropDownMenu() {
    const [products] = React.useContext(Context);

    return (
        <div className="dropdown">
            <button className="dropbtn">Каталог</button>
            <div className="dropdown-content">
                <ul>
                {ProductService.getCategories(products)
                    .map(category=>{return(
                    <Category key={category.id} category={category.category}/>)}
                    )}
                    </ul>
            </div>
        </div>
    );
};

export default DropDownMenu;