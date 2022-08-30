import {useContext} from 'react'
import {FilterArrayContext} from "../../src/services/Context";

class ProductList {
    constructor(productArray) {
        this.productArray = productArray;
    }

    // Рекурсивный проход по всем уровням вложенности объекта (продукта)
    static flatProduct(product) {
        let newObj = {};

        for (let prop in product) {
            if (typeof (product[prop]) == 'object') {
                newObj = Object.assign(newObj, this.flatProduct(product[prop]));
            } else {
                newObj[prop] = product[prop];
            }
        }
        return newObj;
    }

    // Фильтрация продуктов по выбранным чекбоксам в разделе фильтр
    static filterProducts(products, priceDelta, filterArray) {
        //todo переписать через filter
        console.log(products)
        console.log(priceDelta)
        console.log(filterArray)
        let categoryProductList = [];
        let subCategoryProductList = [];
        let byPriceProductList = [];
        let finalProductList = [];
        let filteredProductList = products;

        if (filterArray[0] !== "") {
            for (let i = 0; i < products.length; i++) {
                if (products[i]["category"] === filterArray[0]) {
                    categoryProductList.push(products[i]);
                }
            }
            filteredProductList = categoryProductList;
            console.log(categoryProductList)
        }

        if (filterArray[1] !== "") {
            for (let i = 0; i < categoryProductList.length; i++) {
                if (categoryProductList[i]["filter_features"]["subCategory"] === filterArray[1]) {
                    subCategoryProductList.push(categoryProductList[i]);
                }
            }
            filteredProductList = subCategoryProductList;
        }

        if (priceDelta[0] > 0 || priceDelta[1] < 1000000000) {
            for (let i = 0; i < filteredProductList.length; i++) {
                if (filteredProductList[i]["price"] >= priceDelta[0] && filteredProductList[i]["price"] <= priceDelta[1]) {
                    byPriceProductList.push(filteredProductList[i]);
                }
            }
            filteredProductList = byPriceProductList;
        }

        if (filterArray.length > 2) {
            for (let i = 0; i < filteredProductList.length; i++) {
                for (let feature in filteredProductList[i]["filter_features"]) {
                    console.log(feature)
                    console.log(filterArray)
                    if (filterArray.includes(filteredProductList[i]["filter_features"][feature])) {
                        finalProductList.push(filteredProductList[i]);
                    }
                }
            }

            filteredProductList = finalProductList;
        }
        console.log("Итоговый лист продуктов для рендеринга")
        console.log(filteredProductList)
        return filteredProductList;
    }

    // Сортировка
    static sortProducts(products, field, directSort) {
        let sortDate;
        directSort
            ?
            sortDate = ([...products].sort(
                (a, b) => this.flatProduct(a)[field] > this.flatProduct(b)[field] ? 1 : -1
            ))
            :
            sortDate = ([...products].sort(
                (a, b) => this.flatProduct(a)[field] > this.flatProduct(b)[field] ? 1 : -1
            )).reverse();

        return sortDate;
        }

}

export default ProductList;