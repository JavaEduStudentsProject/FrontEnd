import React from 'react';

function SearchField(props) {

    return (
        <div className="search-block ">
                     <input
                         value={props.searchField}
                        className="search-field "
                        type = "search"
                        placeholder = ""
                        onChange = {props.handleChange}
                    />
                 </div>
    );
}

export default SearchField;