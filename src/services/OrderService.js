import axios from "axios";

const API_URL = "http://localhost:8083/api/createOrder";
const saveOrder = (order) => {

    return axios
        .post(API_URL, {order})

};
const OrderService = {
    saveOrder
}
export default OrderService;