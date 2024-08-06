import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStudioDetail } from "../../store/studios";
import { thunkGetAllStudioInstructors } from "../../store/instructors";
// import { getCurrentSpotReviews } from "../store/reviews";
// import ReviewTile from "./Review/ReviewTile";
import './StudioDetail.css'
// import OpenModalReviewButton from "./Review/OpenModalReviewButton";
// import PostReviewModal from "./Review/PostReviewModal";

function StudioDetail () {
    const {studioId} = useParams();
    const id = Number(studioId)
    const studio = useSelector(state => state.studios[id]);
    const sessionUser = useSelector(state => state.session.user)
    const instructors = useSelector(state => state.instructors)
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();
    // const existingReview = [];

    // for (const review of Object.values(reviews)) {
    //     if (sessionUser && sessionUser.id === review.userId) {
    //         existingReview.push(review)
    //     }
    // }

    useEffect(() => {
        dispatch(getStudioDetail(id))
        .then(dispatch(thunkGetAllStudioInstructors(id)))
        .then(() => {
            setIsLoaded(true)
        })
    }, [id, dispatch, isLoaded])


    return (
        <>
        <div className={`overallContainer`}>
        <h2>{studio?.name}</h2>
        <div className={`studios-area`}>
        <br></br>
        <div className={`imgContainer`}>
                <img className={`logo`} src={studio?.logo} />
                <img className={`picture`} src={studio?.pic} />
        </div>
        <h3>{studio?.description}</h3>
        <br></br>
        <div className={`studio-details`}>
        <div className={`body`}>
            <div className={`paragraph`}>
                <p>{studio?.description}</p>
                </div>
                <div className={`pricing-block`}>
                    <div className={`pricing-grid`}>
                        <span>
                        </span>
                        <span className={`pricing-stars`}>
                            {studio?.avgStarRating === null
                            ? <div>★ New</div>
                            : <span>★ {studio?.avgStarRating?.toFixed(1)} · {studio?.numReviews === 1 ? <span>{studio?.numReviews} review</span> : <span> {studio?.numReviews} reviews</span> } </span>
                            }
                        </span>
                    </div>
                    <div className={`booking-area`}>
                        <button onClick={() => { alert("Feature coming soon");}}className={`book-button`}> Book</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className={`instructors-area`}>
            <div className={`instructors`}>
            { Object.values(instructors).map((instructor) => (
                <span key={`${instructor.id}`}>{instructor.firstName} <img className={`profilePic`} src={`${instructor.profilePic}`}/></span>
            ))}
            </div>
            <br></br>
            {/* <div className={'post-review-area'}>
                {sessionUser && sessionUser.id !== studio?.ownerId && existingReview.length === 0 && reviews.length ===0 &&
                    <div className={`post-review-child`}><OpenModalReviewButton modalComponent={<PostReviewModal className={`post-review-modal`} spotId={id}/>}/><br></br>Be the first to post a review!</div>
                }
                {sessionUser && sessionUser.id !== spot?.ownerId && existingReview.length === 0 && reviews.length !== 0 &&
                    <div><OpenModalReviewButton modalComponent={<PostReviewModal className={`post-review-modal`} spotId={id}/>}/><br></br></div>
                }
            </div> */}
            {/* <div className={`reviewscontainer`}>
                {reviews && Object.values(reviews).map((review) => (
                    <div key={`${review.id}`}><ReviewTile key={`review-${review.id}`} className={`reviewItem`} review={review} spotId={id} /></div>
                ))}
            </div> */}
            </div>
        </div>
        </>
    )
}

export default StudioDetail;
