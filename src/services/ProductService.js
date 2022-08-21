import axios from "axios";

import ProductList from "../ProductList";

const PRODUCT_BASE_REST_API_URL = '/temp_props.json';
// const PRODUCT_BASE_REST_API_URL = '/props.json';
// const PRODUCT_BASE_REST_API_URL = '/initialDetails.json';

class ProductService{

    getAllProducts(){
        return axios.get(PRODUCT_BASE_REST_API_URL)
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

