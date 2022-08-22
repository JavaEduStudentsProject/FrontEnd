import React, {useContext} from 'react';
import {FilterArrayContext} from "../Context";

const Row = (props) => {
    let tempArray = [];
    const {filterArray, setFilterArray} = useContext(FilterArrayContext);
    console.log(filterArray)
    console.log(setFilterArray)


    function setCategoryValueToArray(event) {
        if (event.target.checked) {
            filterArray.push(event.target.value);
            console.log(filterArray);
        } else {
            filterArray.splice(filterArray.indexOf(event.target.value), 1);
            console.log(filterArray);
        }
    }


    // const soldCheckbox = ({ target: { checked } }) => {
    //     console.log(x, checked);
    //     setX(checked);
    // };
    // return (
    //     <div>
    //         <input type="checkbox" checked={x} onChange={soldCheckbox} />
    //     </div>
    // );

    return (
        <div className="filter-field-row">
            {/*<input type="checkbox" id="row" />*/}
            <input type="checkbox" className="row" value={props.categoryValue}
                   onChange={event => setCategoryValueToArray(event)}/>
            <label htmlFor="row">{props.categoryValue}</label>
        </div>
    );
};

export default Row;