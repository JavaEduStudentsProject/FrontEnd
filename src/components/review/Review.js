import {useState} from "react";
import AuthService from "../../forAuthorization/services/auth.service";
import {Input} from "@mui/material";
import {Form} from "react-bootstrap";
import ReviewService from "./ReviewService";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";

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


    const onChangeRating = (e) => {
        const rating = e.target.value;
        setRating(rating);
    };
    const onChangeReview = (e) => {
        const review = e.target.value;
        setReview(review);
    };

    console.log(props.product.id)
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        ReviewService.saveReview(props.product.id, rating, currentUser.username, review).then(
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
