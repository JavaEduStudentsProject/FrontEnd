import StarRating from "../single product components/StarRating";


const OutputReview = (props)=> {


    const allReviewsFromDB = JSON.parse(localStorage.getItem('allReviewsFromDB'));

   const filteredReviews = allReviewsFromDB.filter(review => review.productId === props.productId.toString())
   console.log(filteredReviews)

    console.log("allReviewsFromDB" + allReviewsFromDB)


    return <div>
        {filteredReviews.map(review=>(
            <div key={review.id}>
                    <div className="review-div">
                        <div className="review-div__main">
                            <div className="review-div__user">
                                <h3> {review.userId}</h3>
                             </div>
                             <br/>
                            <div className="review-div__review">
                                <p>{review.review}</p>
                            </div>
                            </div>
                             <div className="review-star">
                                 <StarRating/>
                    </div>
                             </div>

            </div>
        ))}
    </div>

}

export default OutputReview