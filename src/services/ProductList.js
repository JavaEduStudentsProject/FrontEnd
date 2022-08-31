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
    //todo Метод фильтрации требует следующей доработки: сейчас реализовано два варианта -
    // 1. проверка вхождения всех элементов из фильтра в свойства продукта
    // (но тогда при выборе двух разных размеров, он не покажет ни один продукт)
    // 2. проверка вхождения хотя бы одного фильтрующего признака в свойства продукта
    // (в этом случае в итоговый список попадают лишние продукты).
    // Вероятно целесообразнее всего делать объект (мапу ключ-значение)
    // и проверять на наличие хотя бы одного совпадения по каждому ключу.

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
            console.log("Запуск фильтрации")
            console.log(filteredProductList);
            for (let i = 0; i < filteredProductList.length; i++) {
                for (let feature in filteredProductList[i]["filter_features"]) {
                    console.log(feature)
                    console.log(filterArray)
                    console.log(filteredProductList[i]["filter_features"][feature])
                    console.log(Object.values(filteredProductList[i]["filter_features"]))

                    let tempObjectFeatures = Object.values(filteredProductList[i]["filter_features"]);
                    let filterFeatures = filterArray.slice(2);

                    console.log(tempObjectFeatures)
                    let objectFeatures = tempObjectFeatures.map(item => `${item}`)
                    console.log(objectFeatures)
                    console.log(filterFeatures)

                    function check(element) {
                        return objectFeatures.includes(element)
                    }

                    if (filterFeatures.every(check)
                        && !finalProductList.includes(filteredProductList[i])
                    ) {
                        finalProductList.push(filteredProductList[i]);
                        console.log(finalProductList)
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

    static search(products, searchField) {
        let productArray = [];
        const [category, subcategory] = this.searchCategoryAndSubcategoryFromURL();
        if (subcategory !== "") {
            productArray = products.filter(product => ProductList.flatProduct(product)["subCategory"] === subcategory).filter(item => {
                const fullFilter = item.title + item.description;
                return fullFilter.toLowerCase().includes(searchField.toLowerCase());
            })
        } else if (category !== "") {
            productArray = products.filter(product => product.category === category).filter(item => {
                const fullFilter = item.title + item.description;
                return fullFilter.toLowerCase().includes(searchField.toLowerCase());
            })
        } else {
            productArray = products.filter(item => {
                const fullFilter = item.title + item.description + item.category;
                return fullFilter.toLowerCase().includes(searchField.toLowerCase());
            })
        }
        console.log(productArray)
        return productArray;
    }

    static searchCategoryAndSubcategoryFromURL() {
        let catAndSubcat = ["", ""];
        let category;
        let subCategory;
        let regex = /http\:\/\/localhost\:3000\/([\w.\W.]{0,})\/([\w.\W.]{0,})/
        let url = `http://localhost:3000${window.location.pathname}`
        let re = /%20/gi;

        if (url.match(regex) === null) {
            regex = /http\:\/\/localhost\:3000\/([\w.\W.]{0,})/
            if (url.match(regex) === null) {
                return catAndSubcat;
            }
            category = url.match(regex)[1].replace(re, ' ')
            subCategory = "";
            catAndSubcat.push(category)
            catAndSubcat.push(subCategory)
            return catAndSubcat;
        }
        category = url.match(regex)[1].replace(re, ' ');

        if (category === "product") {
            return catAndSubcat;
        }

        subCategory = url.match(regex)[2].replace(re, ' ')

        catAndSubcat.push(category)
        catAndSubcat.push(subCategory)
        console.log(catAndSubcat)
        return catAndSubcat;
    }

}

export default ProductList;