import axios from "axios";

const API_URL = "http://localhost:8083/api/createRating";
const saveRating = (rate, idProduct) => {

    return axios
        .post(API_URL, {
            rate,
            idProduct
        });

};
const RatingService = {
    saveRating
}
export default RatingService;