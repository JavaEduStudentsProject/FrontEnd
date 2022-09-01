import React, {useContext} from 'react';
import ProductList from "../../services/ProductList";
import {ImmutableProductListContext} from "../../services/Context";

function SearchField(props) {
    const {immutableProductList} = useContext(ImmutableProductListContext);

    function handleChange(event) {
        props.setSearchField(event.target.value);
        props.setProductArray(ProductList.search(immutableProductList, props.searchField));
    }

    return (
        <div className="search-block ">
            <input
                value={props.searchField}
                className="search-field "
                type="search"
                placeholder=""
                onChange={event => handleChange(event)}
            />
        </div>
    );
}

export default SearchField;