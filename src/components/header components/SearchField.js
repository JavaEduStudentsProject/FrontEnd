import React from 'react';


function SearchField(props) {

    return (
        <div className="search-block ">
            <input
                value={props.searchField}
                className="search-field "
                type="search"
                placeholder=""
                onChange={event => props.handleChange(event)}
            />
        </div>
    );
}

export default SearchField;