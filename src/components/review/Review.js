import {useState} from "react";
import AuthService from "../../forAuthorization/services/auth.service";
import {Input} from "@mui/material";
import {Form} from "react-bootstrap";
import ReviewService from "./ReviewService";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import {TextArea} from "semantic-ui-react";


const Review = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const currentUser = AuthService.getCurrentUser();
    const [userId, setUserId] = useState("");
    const [productId, setProductId] = useState("");
    const navigate = useNavigate();
    const [successful, setSuccessful] = useState(false);
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");
    const [message, setMessage] = useState("");

    const onChangeUserId = (e) => {
        const userId = e.target.value;
        setUserId(userId);
    };
    const onChangeProductId = (e) => {
        const productId = e.target.value;
        setProductId(productId);
    };
    const onChangeRating = (e) => {
        const rating = e.target.value;
        setRating(rating);
    };
    const onChangeReview = (e) => {
        const review = e.target.value;
        setReview(review);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        ReviewService.saveReview(productId, rating, currentUser.username, review).then(
            (response) => {
                navigate("/profile");
                window.location.reload();
                setMessage(response.data.message);
                setSuccessful(true);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setSuccessful(false);
            }
            );

    };

    return (
        <div className="col-md-12">
            <div className="card card-container">

                <Form onSubmit={handleSubmit} ref={form}>

                    <div>
                        <div className="form-group">
                            <label>UserId</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={currentUser.username}
                                onChange={onChangeUserId}
                            />
                        </div>

                        <div className="form-group">
                            <label>ProductId</label>
                            <Input
                                type="text"
                                name="ProductId"
                                value={productId}
                                onChange={onChangeProductId}
                            />
                        </div>

                        <div className="form-group">
                            <label>Rating</label>
                            <Input
                                type="text"
                                name="Rating"
                                value={rating}
                                onChange={onChangeRating}
                            />
                        </div>
                        <div className="form-group">
                            <label>Review</label>
                            <textarea
                                type="text"
                                name="Review"
                                value={review}
                                onChange={onChangeReview}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Send review</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Review;
