// import React, { useState, useRef } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
//
//
import {useForm} from "react-hook-form";
import {useState} from "react";
import AuthService from "../../forAuthorization/services/auth.service";
import {Input} from "@mui/material";
import {Form} from "react-bootstrap";


const Review = (props) => {
    const currentUser = AuthService.getCurrentUser();
    const [username, setUsername] = useState("");
 const [productId, setProductId] = useState("");

  const [rating, setRating] = useState();
     const [review, setReview] = useState("");


    const onChangeReview = (e) => {
        const review = e.target.value;
        setReview(review);
    };



    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div className="col-md-12">
            <div className="card card-container">

                <Form onSubmit={handleSubmit} >

                        <div>
                            <div className="form-group">
                                <label htmlFor="username">UserId</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}

                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">ProductId</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="ProductId"
                                    value={productId}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Rating</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="Rating"
                                    value={rating}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Review</label>
                                <Input
                                    type="text"
                                    className="form-control"
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
