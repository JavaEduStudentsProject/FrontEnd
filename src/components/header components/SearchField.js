import React, {useState} from 'react';

function SearchField(props) {
    // const [value, setValue] = useState("Поисковый запрос");
    const [searchField, setSearchField] = useState("");

    const filteredProducts = props.products.filter(
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