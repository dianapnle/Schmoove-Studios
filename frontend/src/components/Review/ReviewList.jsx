import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllReviews } from "../../store/reviews";
import OpenModalReviewButton from "./OpenModalReviewButton";
import ReviewTile from "../Review/ReviewTile";
import PostReviewModal from "./PostReviewModal";

function ReviewList({ studioId }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const reviews = useSelector(state => state.reviews)
    const sessionUser = useSelector(state => state.session.user)
    const existingReview = [];
    for (const review of Object.values(reviews)) {
        if (sessionUser && sessionUser.id === review.userId) {
            existingReview.push(review)
        }
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllReviews(studioId)).then(() => {
            setIsLoaded(true)
        })

    }, [studioId, dispatch, setIsLoaded])

    return (
        <div className={`reviews`}>
        <h2>Reviews:</h2>
        {existingReview.length > 0 && <div className={`add`}>
        <OpenModalReviewButton modalComponent={<PostReviewModal studioId={studioId}/>} />
        </div>}
        <br></br>
        {!isLoaded || Object.values(reviews).length === 0
            ? <div className={`none`}>No reviews yet!</div>
            : Object.values(reviews).map((el) => (
            <ReviewTile key={`${el.id}`} reviewId={el.id} />
        ))}
        </div>
    )

}

export default ReviewList;
