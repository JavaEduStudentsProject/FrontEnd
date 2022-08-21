import React from 'react';
import Row from "./Row";

const Field = (props) => {
    console.log(props)

    let filterRows = props.fieldArray.map((item, index) =>
        <Row
            key={index}
            categoryValue={item}
        />
    )


    return (
        <div className="filter-field">
            <h2>{props.fieldName}</h2>
            {filterRows}
        </div>
    );
};

export default Field;