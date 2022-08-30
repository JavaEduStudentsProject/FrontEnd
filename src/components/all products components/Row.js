import React, {useContext} from 'react';
import {FilterArrayContext} from "../../services/Context";

const Row = (props) => {
    const {filterArray, setFilterArray} = useContext(FilterArrayContext);

    function setCategoryValueToArray(event) {
        if (event.target.checked) {
            setFilterArray([...filterArray, event.target.value])
            // filterArray[] = props.categoryValue;
            // filterArray.push(event.target.value);
            // console.log(filterArray);
        } else {
            setFilterArray([...filterArray.splice(filterArray.indexOf(event.target.value), 1)]);
            // console.log(filterArray);
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