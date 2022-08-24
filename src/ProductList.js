import {useContext} from 'react'
import {FilterArrayContext} from "./components/Context";

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
        console.log(products)
        console.log(priceDelta)
        console.log(filterArray)
        let tempProductList = [];
        let filteredProductList = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i]["price"] >= priceDelta[0] && products[i]["price"] <= priceDelta[1]) {
                tempProductList.push(products[i]);
            }
        }
        console.log(tempProductList)
        for (let i = 0; i < tempProductList.length; i++) {
            for (let feature in tempProductList[i]["filter_features"]) {
                console.log(feature)
                for (let j = 0; j < filterArray.length; j++) {
                    if (filterArray[j] == tempProductList[i]["filter_features"][feature]) {
                        console.log(feature)
                        console.log(filterArray[j])
                        filteredProductList.push(tempProductList[i]);
                    }
                }

            }
        }
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