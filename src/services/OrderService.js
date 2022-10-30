import axios from "axios";

const API_URL = "http://localhost:8083/api/createOrder";

const ORDERS_BASE_REST_API_URL = 'http://localhost:8083/api/orders';


class OrderService  {
    getAllOrders() {
        return axios.get(ORDERS_BASE_REST_API_URL)

    }


    saveOrder = (order) => {

        return axios
            .post(API_URL, {order})
    };


    // getObjOrders = () => {
    //     return JSON.parse(localStorage.getItem("allOrderFromDB"));
    // };
}
export default new OrderService();