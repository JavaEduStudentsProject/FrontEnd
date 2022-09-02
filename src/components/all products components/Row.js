import React, {useContext} from 'react';
import {FilterArrayContext} from "../../services/Context";

const Row = (props) => {
    const {filterArray, setFilterArray} = useContext(FilterArrayContext);

    function setCategoryValueToArray(event) {
        if (event.target.checked) {
            let fieldNames = [];
            for (let i = 2; i < filterArray.length; i++) {
                fieldNames.push(filterArray[i][0]);
            }

            if (fieldNames.includes(props.fieldName)) {
                filterArray[fieldNames.indexOf(props.fieldName) + 2].push(event.target.value);
            } else {
                filterArray.push([props.fieldName, event.target.value])
            }
        }

        //!!! эта строка включает динамическое поведение фильтра !!!
        // props.setFlag(prevState => !prevState);

        else {
            let newFilterArray = filterArray;
            if (newFilterArray.length > 2) {
                for (let i = 2; i < newFilterArray.length; i++) {
                    if (newFilterArray[i].includes(props.fieldName) && newFilterArray[i].includes(event.target.value)) {
                        if (newFilterArray[i].length === 2) {
                            newFilterArray.splice(i, 1);
                        } else {
                            newFilterArray[i].splice(newFilterArray[i].indexOf(event.target.value), 1);
                        }
                    }
                }
            }
            setFilterArray(newFilterArray);
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