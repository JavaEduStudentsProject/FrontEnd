import React from 'react';

const Row = (props) => {
    console.log(props.categoryValue)
    return (
        <div className="filter-field-row">
            <input type="checkbox" id="row"/>
            <label htmlFor="row">{props.categoryValue}</label>
        </div>
    );
};

export default Row;