import React from 'react';
import Field from "./Field";

const Filter = (props) => {
    console.log(props.item);
    // const keys = Object.keys(props.item).filter(key => key === "category" || key === "price" || key === "size");
    // const keys = Object.keys(props.item).filter(key => key != "image" && key != "description");
    const keys = ["category", "price", "size"];
    console.log(keys)
    console.log(keys[0])
    console.log(keys[1])
    console.log(keys[2])


    function getFieldArray(keys, productArray) {
        let filters = [
            {category: []},
            {price: []},
            {size: []},
        ];
        console.log(filters[0][keys[0]])
        console.log(filters[1][keys[1]])
        console.log(filters[2][keys[2]])
        for (let i = 0; i < keys.length; i++) {
            productArray.forEach(item => {
                if (filters[i][keys[i]] != null && !filters[i][keys[i]].includes(item[keys[i]])) {
                    filters[i][keys[i]].push(item[keys[i]])
                }
            })
            // filters[i][keys[i]] = filters[keys[i]];

        }
        return filters;
    }

    const fieldArray = getFieldArray(keys, props.item);
    console.log("провекра на массив:")
    console.log(fieldArray)
    let test = fieldArray[0][Object.keys(fieldArray[0])[0]];
    console.log(test);

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