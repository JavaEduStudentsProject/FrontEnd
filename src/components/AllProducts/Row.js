import React, {useContext} from 'react';
import {FilterArrayContext} from "../Context";

const Row = (props) => {
    let tempArray = [];
    const {filterArray, setFilterArray} = useContext(FilterArrayContext);
    console.log(filterArray)
    console.log(setFilterArray)


    function setCategoryValueToArray(event) {
        filterArray.push(event.target.value);
        console.log(filterArray);
    }

    return (
        <div className="filter-field-row">
            {/*<input type="checkbox" id="row" />*/}
            <input type="checkbox" className="row" value={props.categoryValue} onClick={event => setCategoryValueToArray(event)}/>
            <label htmlFor="row">{props.categoryValue}</label>
        </div>
    );
};

export default Row;