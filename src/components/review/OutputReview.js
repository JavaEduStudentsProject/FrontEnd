
const OutputReview = (props)=> {

    const allReviewsFromDB = JSON.parse(localStorage.getItem("allReviewsFromDB"))
    // const filteredReviews = allReviewsFromDB.filter(review => review.productId === props.product.id)
    // const review = Object.values(filteredReviews)
    const reviews = Object.values(allReviewsFromDB)
    const reviewsF = Object.values(reviews)

    const keys = Object.keys(allReviewsFromDB)


    console.log("allReviewsFromDB" + allReviewsFromDB)
    console.log("userOrders" + reviews)
    console.log("local" + localStorage.getItem("allReviewsFromDB"))
    console.log("reviewsF" + reviewsF)
    // console.log("filteredReviews"+filteredReviews)
    // console.log("review"+review)

    return <div>
        {/*{review.review}*/}

    </div>

}

export default OutputReview