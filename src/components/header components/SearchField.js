import React, {useState, useContext} from 'react';
import {Context} from "../Context";

function SearchField(props) {
    const [searchField, setSearchField] = useState("");
    const [products, setProducts] = useContext(Context);

    const filteredProducts = products.filter(
        product => {
            return (
                product
                    .title
                    .toLowerCase()
                    .includes(searchField.toLowerCase()) ||
                product
                    .description
                    .toLowerCase()
                    .includes(searchField.toLowerCase()) ||
                product
                    .category
                    .toLowerCase()
                    .includes(searchField.toLowerCase())
            );
        }
    );
    const handleChange = e => {
        setSearchField(e.target.value);
        console.log(filteredProducts)
        // setProducts(filteredProducts);
    };


    return (
        <div className="search-block ">
                     <input
                        className="search-field "
                        type = "search"
                        placeholder = ""
                        onChange = {handleChange}
                    />
                 </div>

        // <div className="search-block">
        // <h2 className="search-text">{value}</h2>
        // <input
        //     className="search-field"
        //     type="text"
        //     value={value}
        //     onChange={event => setValue(event.target.value)}
        // />
        // </div>
    );
}

export default SearchField;