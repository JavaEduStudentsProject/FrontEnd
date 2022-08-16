import React from 'react';
import Field from "./Field";

const Filter = (props) => {
    console.log(props.item);
    // const keys = Object.keys(props.item).filter(key => key === "category" || key === "price" || key === "size");
    // const keys = Object.keys(props.item).filter(key => key != "image" && key != "description");
    const keys = ["category", "price", "size"];

    function getFieldArray(keys, productArray) {
        let filters = [
            {category: []},
            {price: []},
            {size: []},
        ];
        for (let i = 0; i < keys.length; i++) {
            productArray.forEach(item => {
                if (filters[i][keys[i]] != null && !filters[i][keys[i]].includes(item[keys[i]])) {
                    filters[i][keys[i]].push(item[keys[i]])
                }
            })
        }
        return filters;
    }

    const fieldArray = getFieldArray(keys, props.item);

    const fieldComponent = fieldArray.map(item => {
        return <Field fieldName={Object.keys(item)[0]}
                      fieldArray={item[Object.keys(item)[0]]}
                />
    })

    return (
        <fieldset className="filter">
            <legend>Фильтр по характеристикам</legend>
            {fieldComponent}
        </fieldset>
    );
};

export default Filter;