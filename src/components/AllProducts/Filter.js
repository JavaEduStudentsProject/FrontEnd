import React from 'react';
import Field from "./Field";

const Filter = (props) => {
    console.log(props.productArray);



    const keys = ["category", "price", "size"];

    function getFieldArray(keys, productArray) {
        let fieldArray = [
            {category: []},
            {price: []},
            {size: []},
        ];
        for (let i = 0; i < keys.length; i++) {
            productArray.forEach(item => {
                if (fieldArray[i][keys[i]] != null && !fieldArray[i][keys[i]].includes(item[keys[i]])) {
                    fieldArray[i][keys[i]].push(item["filter_features"][keys[i]])
                }
            })
        }
        return fieldArray;
    }

    console.log(props.productArray);
    const fieldArray = getFieldArray(keys, props.productArray);

    console.log(fieldArray);

    const fieldComponent = fieldArray.map((item, index) => {
        return <Field
            key={index}
            fieldName={Object.keys(item)[0]}
            fieldArray={item[Object.keys(item)[0]]}
        />
    })
    if (props.category) {
        return (
            <fieldset className="filter">
                <legend>Фильтр по характеристикам</legend>
                {fieldComponent}
            </fieldset>
        );
    }
};

export default Filter;