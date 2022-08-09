import React, {useState} from 'react';

function SearchField() {
    const [value, setValue] = useState("Поисковый запрос");
    return (
        <div className="search-block">
        <h2 className="search-text">{value}</h2>
        <input
            className="search-field"
            type="text"
            value={value}
            onChange={event => setValue(event.target.value)}
        />
        </div>
    );
}

export default SearchField;