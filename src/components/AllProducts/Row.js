import React, {useContext} from 'react';
import {FilterArrayContext} from "../Context";

const Row = (props) => {
    const {filterArray} = useContext(FilterArrayContext);

    function setCategoryValueToArray(event) {
        if (event.target.checked) {
            // filterArray[] = props.categoryValue;
            filterArray.push(event.target.value);
            console.log(filterArray);
        } else {
            filterArray.splice(filterArray.indexOf(event.target.value), 1);
            console.log(filterArray);
        }
    }

    return (
        <div className="filter-field-row">
            <input type="checkbox" className="row" value={props.categoryValue}
                   onChange={event => setCategoryValueToArray(event)}/>
            <label htmlFor="row">{props.categoryValue}</label>
        </div>
    );
};

export default Row;