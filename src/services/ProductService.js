import axios from "axios";

import ProductList from "../../src/services/ProductList";


const PRODUCT_BASE_REST_API_URL = 'http://localhost:8083/api/products';

class ProductService{

    getAllProducts(){
        return axios.get(PRODUCT_BASE_REST_API_URL)
    }

    getRecommendedProducts(username) {
        console.log("Функция getRecommendedProducts начала работу")
        let promise;
        try {
            promise = fetch(`http://localhost:8083/request_from_react/${username}`, {
                method: "GET",
                headers: {
                    // "Access-Control-Allow-Origin": 'http://localhost:3000',
                    // "Access-Control-Allow-Credentials": 'true',
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            })
            return promise
        } catch (e) {
            console.error(e)
        }
    }


    getRecommendedProductsFromBasket(basketArray) {
        console.log("Функция getRecommendedProducts начала работу")
        let promise;
        try {
            promise = fetch(`http://localhost:8083/basket_request_from_react/${basketArray}`, {
                method: "GET",
                headers: {
                    // "Access-Control-Allow-Origin": '*',
                    // "Access-Control-Allow-Credentials": 'true',
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            })
            return promise
        } catch (e) {
            console.error(e)
        }
    }

    getCategories(prod) {
        let categories = [...prod].sort(
            (a, b) => a['category'] > b['category'] ? 1 : -1
        )
            .reduce((accumulator, currentValue) => {
                if (accumulator.every(item => !(item.category === currentValue.category )))
                    accumulator.push(currentValue);
                return accumulator;
            }, [])
        return categories;
    }

    getSubCategories(productArray, category) {
        let subCategoryArray = [];
        let flatProductArray = productArray.map(product => {
            return ProductList.flatProduct(product);
            })

        for (let i = 0; i < flatProductArray.length; i++) {
            if (flatProductArray[i]["category"] === category && !subCategoryArray.includes(flatProductArray[i].subCategory)) {
                subCategoryArray.push(flatProductArray[i].subCategory)
            }
        }
        return subCategoryArray;
    }
}
export default new ProductService();

