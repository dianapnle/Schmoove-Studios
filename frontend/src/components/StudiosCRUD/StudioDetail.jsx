import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStudioDetail } from "../../store/studios";
import { thunkGetAllStudioInstructors } from "../../store/instructors";
import { thunkGetAllClasses } from "../../store/classes";
import ClassTile from "../ClassesCRUD/ClassTile";
// import { getCurrentSpotReviews } from "../store/reviews";
// import ReviewTile from "./Review/ReviewTile";
import './StudioDetail.css'
// import OpenModalReviewButton from "./Review/OpenModalReviewButton";
// import PostReviewModal from "./Review/PostReviewModal";

function StudioDetail () {
    const {studioId} = useParams();
    const id = Number(studioId)
    const studio = useSelector(state => state.studios[id]);
    // const sessionUser = useSelector(state => state.session.user)
    const instructors = useSelector(state => state.instructors);
    const classes = useSelector(state => state.classes)
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
        .then(dispatch(thunkGetAllClasses(id)))
        .then(() => {
            setIsLoaded(true)
        })
    }, [id, dispatch, isLoaded])


    return (
        <>
        <div className={`overallContainer`}>
            <div className="contentBody">
            <div className='title'>
            <div className={`imgContainer`}>
                <img className={`logo`} src={studio?.logo} />
        </div>

            <div className={`pricing-stars`}>
                <h2>{studio?.name}</h2>
                <div className="stats">
                {studio?.avgStarRating === null ? <div><span className="star">★</span> New</div>
                    : <span><span className="star">★</span> {studio?.avgStarRating?.toFixed(1)} · {studio?.numReviews === 1 ? <span>{studio?.numReviews} review</span> : <span> {studio?.numReviews} reviews</span> } </span>
                }
                </div>
            </div>
            <br></br>
            </div>
        <div className={`studios-area`}>
        <br></br>
        <div className={`imgContainer`}>
                <img className="pictureDetail" src={studio?.pic} />
        </div>
        <div className="description"><h3>{studio?.description}</h3></div>
        <br></br>
        <div className={`studio-details`}>
        <div className={`body`}>
            <div className={`paragraph`}>
                </div>
                <div className={`pricing-block`}>
                    {/* <div className={`booking-area`}>
                        <button onClick={() => { alert("Feature coming soon");}}className={`book-button`}> Book</button>
                        </div> */}
                    </div>
                </div>
            </div>
            </div>
            <div className="instructorOverall">
            <h2>Our Instructors:</h2>
            </div>
            <div className={`instructors-area`}>
            <div className={`instructors`}>
            {Object.values(instructors).length === 0
                ? <div className={`none`}>No instructors yet!</div>
                : Object.values(instructors).map((instructor) => (
                <span key={`${instructor.id}`}>
                    <div className="individualinstructor">
                        <img className={`profilePic`} src={`${instructor.profilePic}`}/>
                    </div>
                    <div className="firstName">{instructor.firstName}</div>
                </span>
            ))}
            </div>
            <br></br>
            <div className={`classes`}>
            <h2>Our Classes:</h2>
            {Object.values(classes).length === 0
                ? <div className={`none`}>No classes yet!</div>
                : Object.values(classes).map((el) => (
                <span><ClassTile key={`${el.id}`} classId={el.id} /></span>
            ))}
            </div>
            <br></br>
            </div>
            </div>
        </div>
        </>
    )
}

export default StudioDetail;
