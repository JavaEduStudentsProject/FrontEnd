import React, {useContext} from 'react';
import Field from "./Field";
import PriceFilterField from "./PriceFilterField";
import {FilterArrayContext, ImmutableProductListContext, PriceFilterArrayContext, ProductListContext} from "../../services/Context";
import ProductList from "../../services/ProductList";
import {useParams} from "react-router-dom";

const Filter = (props) => {
    const {products, setProducts} = useContext(ProductListContext);
    const {immutableProductList} = React.useContext(ImmutableProductListContext);
    const {filterArray} = useContext(FilterArrayContext);
    const {priceDelta} = useContext(PriceFilterArrayContext);

    const {category, subcategory} = useParams();

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

    const filterProps = getFilterProps(products);


    function getEmptyFilterFieldArray(filterProps) {
        let fieldArray = [];
        for (let i = 0; i < filterProps.length; i++) {
            let obj = {};
            obj[filterProps[i]] = [];
            fieldArray.push(obj);
        }
        return fieldArray;
    }

    let emptyFilterFieldArray = getEmptyFilterFieldArray(filterProps);



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

    const filledFilterFieldArray = getFilledFilterFieldArray(filterProps, products, emptyFilterFieldArray);


    function handleSubmitClick(e) {
        e.preventDefault();

        let filteredProductList = ProductList.filterProducts(products, priceDelta, filterArray);
        setProducts(filteredProductList);
    }

    function handleCancellClick(e) {
        e.preventDefault();
        filterArray.splice(2);
        let filteredProductList = ProductList.filterProducts(immutableProductList, priceDelta, filterArray);
        setProducts(filteredProductList);
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