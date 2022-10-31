import {useEffect, useState} from "react";
import ProductService from "../../services/ProductService";

const OutputReview = (props)=> {


    const allReviewsFromDB = JSON.parse(localStorage.getItem('allReviewsFromDB'));

   const filteredReviews = allReviewsFromDB.filter(review => review.productId === props.productId.toString())
   console.log(filteredReviews)

    console.log("allReviewsFromDB" + allReviewsFromDB)


    return <div>
        {filteredReviews.map(review=>(
            <div key={review.id}> {review.review}</div>
        ))}


    </div>

}

export default OutputReview