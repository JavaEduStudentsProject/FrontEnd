import axios from "axios";

const PRODUCT_BASE_REST_API_URL = '/initialDetails.json';

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
}
export default new ProductService();

