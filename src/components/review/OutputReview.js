import React from "react";
import MiniStarOnProduct from "../single product components/MiniStarOnProduct";

const OutputReview = (props) => {


    const allReviewsFromDB = JSON.parse(localStorage.getItem('allReviewsFromDB'));

    const filteredReviews = allReviewsFromDB.filter(review => review.productId === props.productId.toString())
    console.log(filteredReviews)
    console.log("allReviewsFromDB" + allReviewsFromDB)


    const starRate = (rate) => {
        let item = [];
        for (let i = 1; i <= rate; i++) {
            item[i] = i;
        }
        let item2 = [];
        let star = 5 - item[item.length-1];
        for (let i = 1; i <= star; i++) {
            item2[i] = i;
        }
        return item2
    }

    return <div>
        {filteredReviews.map(review => (
            <div key={review.id}>
                <div className="review-div">
                    <div className="review-div__main">
                        <div className="review-div__user">
                            <h3> Пользователь {review.userId}</h3>
                        </div>
                        <br/>
                        <div className="review-div__review">
                            <p>Оставил комментарий:  {review.review}</p>
                        </div>
                    </div>
                    <div className="review-star">
                        <p>Оценка: {review.rating}</p>
                        <form id="form" action="#" className="star-form">
                            <div className="star-rating">
                                <div className="star-items">
                                {starRate(review.rating).map(rate => (
                                    <MiniStarOnProduct key={rate}
                                    />
                                ))}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        ))}
    </div>

}

export default OutputReview