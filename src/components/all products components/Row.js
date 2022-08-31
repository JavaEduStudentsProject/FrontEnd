import React, {useContext} from 'react';
import {FilterArrayContext} from "../../services/Context";

const Row = (props) => {
    const {filterArray, setFilterArray} = useContext(FilterArrayContext);

    function setCategoryValueToArray(event) {
        if (event.target.checked) {
            // setFilterArray([...filterArray, event.target.value])
            filterArray.push(event.target.value)
            console.log(filterArray);
            props.setFlag(prevState => !prevState);

        } else {
            let newFilterArray = filterArray;
            if (filterArray.length > 2) {
                newFilterArray.splice(newFilterArray.indexOf(event.target.value), 1)
                setFilterArray(newFilterArray)
            }
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