import axios from "axios";

const API_URL = "http://localhost:8083/api/";

const saveReview = (productId, rating, userId, review) => {
    return axios.post(API_URL + "review", {
        productId,
        rating,
        userId,
        review
    })
};

const ReviewService = {
    saveReview,
}

export default ReviewService;
