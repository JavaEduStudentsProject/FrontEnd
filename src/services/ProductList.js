import cloneDeep from 'lodash.clonedeep'

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
        let finalProductList = [];
        let filteredProductList = products;

        if (filterArray[0] !== "") {
            filteredProductList = products.filter(product => product["category"] === filterArray[0]);
        }

        if (filterArray[1] !== "") {
            filteredProductList = filteredProductList.filter(product => ProductList.flatProduct(product)["subCategory"] === filterArray[1]);
        }

        if (priceDelta[0] > 0 || priceDelta[1] < 1000000000) {
            filteredProductList = filteredProductList.filter(product =>
                product["price"] >= priceDelta[0] && product["price"] <= priceDelta[1]);
        }

        if (filterArray.length > 2) {
            const pureFilterArray = cloneDeep(filterArray.slice(2))
            for (let i = 0; i < pureFilterArray.length; i++) {
                pureFilterArray[i].splice(0, 1);
            }

            for (let i = 0; i < filteredProductList.length; i++) {
                function check(element) {
                    let tempObjectFeatures = Object.values(filteredProductList[i]["filter_features"]);
                    let objectFeatures = tempObjectFeatures.map(item => `${item}`)
                    return objectFeatures.includes(element)
                }
                let flag = false;
                for (let j = 0; j < pureFilterArray.length; j++) {
                    if (pureFilterArray[j].some(check)) {
                        flag = true;
                    } else {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    finalProductList.push(filteredProductList[i]);
                }
            }
            filteredProductList = finalProductList;
        }
        console.log("Итоговый лист продуктов для рендеринга")
        console.log(filteredProductList)
        return filteredProductList;
    }

    // Метод сортировки
    static sortProducts(products, field, directSort) {
        let sortDate = ([...products].sort(
            (a, b) => {
                let first = field === "price" ? parseInt(this.flatProduct(a)[field], 10) : this.flatProduct(a)[field];
                let second = field === "price" ? parseInt(this.flatProduct(b)[field], 10) : this.flatProduct(b)[field];
                return first > second ? 1 : -1
            }
        ));

        sortDate = directSort ? sortDate : sortDate.reverse();

        return sortDate;
    }

    // Метод поиска в поисковой строке в хедере.
    static search(products, searchField) {
        let productArray = [];
        const [category, subcategory] = this.searchCategoryAndSubcategoryFromURL();
        console.log(category, subcategory)
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

/*    Метод парсинга url для получения текущей категории и субкатегории.
    Необходим в данном классе, потому что он не видит useParams().*/
    static searchCategoryAndSubcategoryFromURL() {
        console.log("Запуск метода парметров url")
        console.log(window.location.pathname)
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
            catAndSubcat[0] = category;
            catAndSubcat[1] = subCategory;
            return catAndSubcat;
        }
        category = url.match(regex)[1].replace(re, ' ');

        if (category === "product") {
            return catAndSubcat;
        }

        subCategory = url.match(regex)[2].replace(re, ' ')

        catAndSubcat[0] = category;
        catAndSubcat[1] = subCategory;

        return catAndSubcat;
    }

}

export default ProductList;