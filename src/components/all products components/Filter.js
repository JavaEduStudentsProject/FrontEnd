import React, {useContext} from 'react';
import Field from "./Field";
import PriceFilterField from "./PriceFilterField";
import {FilterArrayContext, ImmutableProductListContext, PriceFilterArrayContext, ProductListContext} from "../../services/Context";
import ProductList from "../../services/ProductList";
import {useParams} from "react-router-dom";

const Filter = (props) => {
    const {immutableProductList} = React.useContext(ImmutableProductListContext);
    const {filterArray, setFilterArray} = useContext(FilterArrayContext);
    const {priceDelta} = useContext(PriceFilterArrayContext);

    const {category, subcategory} = useParams();

    if (category) {
        if (category !== filterArray[0]) {
            setFilterArray([category, ""]);
        }
        if (subcategory) {
            filterArray[1] = subcategory;
        }
    }

    let currentProductList = ProductList.filterProducts(immutableProductList, priceDelta, filterArray);

    function getFilterProps(productArray) {
        let filterProps = [];
        for (let i = 0; i < productArray.length; i++) {
            for (let feature in productArray[i]["filter_features"]) {
                if (!filterProps.includes(feature) && feature !== "subCategory") {
                    filterProps.push(feature);
                }
            }
        }
        return filterProps;
    }

    const filterProps = getFilterProps(currentProductList);
    console.log(filterProps)


    function getEmptyFilterFieldArray(filterProps) {
        let fieldArray = [];
        for (let i = 0; i < filterProps.length; i++) {
            let obj = {};
            obj[filterProps[i]] = [];
            fieldArray.push(obj);
        }
        console.log(fieldArray)
        return fieldArray;
    }

    let emptyFilterFieldArray = getEmptyFilterFieldArray(filterProps);

    console.log(emptyFilterFieldArray);


    function getFilledFilterFieldArray (keys, productArray, emptyArray) {
        for (let i = 0; i < keys.length; i++) {
            productArray.forEach(item => {
                if (emptyArray[i][keys[i]] != null && !emptyArray[i][keys[i]].includes(item["filter_features"][keys[i]])) {
                    emptyArray[i][keys[i]].push(item["filter_features"][keys[i]])
                }
            })
        }
        return emptyArray;
    }

    const filledFilterFieldArray = getFilledFilterFieldArray(filterProps, currentProductList, emptyFilterFieldArray);

    console.log(filledFilterFieldArray);

    function handleSubmitClick(e) {
        e.preventDefault();
        console.log("For filter function: " + filterArray);
        console.log("For filter function: " + priceDelta);
        // let filteredProductList = ProductList.filterProducts(immutableProductList, priceDelta, filterArray);
        // console.log(filteredProductList)
        // setProducts(filteredProductList);
        props.setFlag(prevState => !prevState)
    }

    function handleCancelClick(e) {
        e.preventDefault();
        let newFilterArray = filterArray;
        newFilterArray.splice(2)
        setFilterArray(newFilterArray)
        priceDelta[0] = 0;
        priceDelta[1] = 1000000000;
        console.log(document.getElementById('form'));
        document.getElementById('form').reset();
        props.setFlag(prevState => !prevState)
        // filterArray.splice(2);
        // let filteredProductList = ProductList.filterProducts(immutableProductList, priceDelta, filterArray);
        // setProducts(filteredProductList);
    }

    const fieldComponent = filledFilterFieldArray.map((item, index) => {
        return <Field
            key={index}
            fieldName={Object.keys(item)[0]}
            fieldArray={item[Object.keys(item)[0]]}
            setFlag={props.setFlag}
            filledFilterFieldArray={filledFilterFieldArray}
        />
    })
        return (
            <fieldset className="filter">
                <legend>Фильтр</legend>
                <form id="form">
                    <PriceFilterField/>
                    {fieldComponent}
                    <button type="submit" onClick={handleSubmitClick}>Найти</button>
                    <button type="submit" onClick={handleCancelClick} >Сбросить</button>
                    {/*второй вариант для сброса введенных данных в фильтре:*/}
                    {/*<button type="reset" onClick={handleCancelClick} >Сбросить</button>*/}
                </form>
            </fieldset>
        );
    }
};

export default Filter;