import React, {useContext, useState} from 'react';
import ProductList from "../../services/ProductList";
import {ImmutableProductListContext} from "../../services/Context";

function SearchField(props) {
    const {immutableProductList} = useContext(ImmutableProductListContext);
    const handleChange = e => {
        props.setSearchField(e.target.value);
        props.setProductArray(ProductList.search(immutableProductList, e.target.value));
    };


    return (
        <div className="search-block ">
            <input
                value={props.searchField}
                className="search-field "
                type="search"
                placeholder=""
                // onChange={event => handleChange(event)}
                onChange={handleChange}
            />
        </div>
    );
}

export default SearchField;