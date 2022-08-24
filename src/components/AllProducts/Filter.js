import React, {useContext} from 'react';
import Field from "./Field";
import PriceFilterField from "./PriceFilterField";
import {FilterArrayContext, PriceFilterArrayContext, ProductListContext, CashProductListContext} from "../Context";
import ProductList from "../../ProductList";

const Filter = (props) => {
    const [products, setProducts] = useContext(ProductListContext);
    const {cashProducts} = useContext(CashProductListContext);
    console.log(cashProducts)
    const {filterArray} = useContext(FilterArrayContext);
    console.log(filterArray)
    const {priceDelta} = useContext(PriceFilterArrayContext);
    console.log(priceDelta)

    function getFilterProps(productArray) {
        let filterProps = [];
        for (let i = 0; i < productArray.length; i++) {
            for (let feature in productArray[i]["filter_features"]) {
                if (!filterProps.includes(feature)) {
                    filterProps.push(feature);
                }
            }
        }
        return filterProps;
    }

    const filterProps = getFilterProps(props.productArray);
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

    console.log(props.productArray);
    const filledFilterFieldArray = getFilledFilterFieldArray(filterProps, props.productArray, emptyFilterFieldArray);

    console.log(filledFilterFieldArray);

    function handleSubmitClick(e) {
        e.preventDefault();
        console.log("For filter function: " + filterArray);
        console.log("For filter function: " + priceDelta);
        console.log(props.productArray);
        let filteredProductList = ProductList.filterProducts(props.productArray, priceDelta, filterArray);
        console.log(filteredProductList)
        setProducts(filteredProductList);
    }

    function handleCancellClick(e) {
        e.preventDefault();
        console.log(cashProducts);
        setProducts(cashProducts);
    }

    const fieldComponent = filledFilterFieldArray.map((item, index) => {
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
                <form>
                    <PriceFilterField/>
                    {fieldComponent}
                    <button type="submit" onClick={handleSubmitClick}>Найти</button>
                    <button type="submit" onClick={handleCancellClick}>Сбросить</button>
                </form>
            </fieldset>
        );
    }
};

export default Filter;