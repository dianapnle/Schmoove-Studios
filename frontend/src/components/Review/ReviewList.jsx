import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllReviews } from "../../store/reviews";
import OpenModalReviewButton from "./OpenModalReviewButton";
import ReviewTile from "../ClassesCRUD/ClassTile";
import PostReviewModal from "./PostReviewModal";

function ReviewList({ studioId, showEdit }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const reviews = useSelector(state => state.reviews)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllReviews(studioId)).then(() => {
            setIsLoaded(true)
        })

    }, [studioId, dispatch, setIsLoaded])

    return (
        <div className={`reviews`}>
        <h2>Reviews:</h2>
        {<div className={`add`}>
        <OpenModalReviewButton modalComponent={<PostReviewModal studioId={studioId}/>} />
        </div>}
        <br></br>
        {!isLoaded || Object.values(reviews).length === 0
            ? <div className={`none`}>No reviews yet!</div>
            : Object.values(reviews).map((el) => (
            <ReviewTile key={`${el.id}`} reviewId={el.id} showEdit={showEdit} />
        ))}
        </div>
    )

}

export default ReviewList;
