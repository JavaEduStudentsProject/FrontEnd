import React from 'react';
import Row from "./Row";
import ProductCard from "./ProductCard";

const Field = (props) => {
    console.log(props.fieldName);
    console.log(props.fieldArray);

    let filterRows = props.fieldArray.map((item) =>
        <Row
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