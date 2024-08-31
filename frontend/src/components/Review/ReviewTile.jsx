// import { useNavigate } from 'react-router-dom';
import './ReviewTile.css'
import { useSelector } from 'react-redux';
import OpenModalDeleteButton from '../StudiosCRUD/OpenModalDeleteStudio.jsx';
import DeleteReviewModal from './DeleteReviewModal.jsx'
import OpenModalEditReviewButton from './OpenEditModal.jsx';
import EditReviewModal from './EditReviewModal.jsx';

function ReviewTile ({ reviewId }) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    const id = Number(reviewId)
    const review = useSelector(state => state.reviews[id]);


    const date = new Date(review?.updatedAt);
    const sessionUser = useSelector(state => state.session.user)

    return (
        <>
        <div className={`reviewitem`}>
        <br></br>
        <div className={`review-user`}>
            {review.User?.firstName}
        </div>
        <span className={`review-date`}>{monthNames[date.getMonth()]} {date.getFullYear()}</span>
        <p className={`review-body`}>{review?.review}</p>
        <p className={`review-body`}>{review?.rating}</p>
        {sessionUser?.id === review.userId &&
        <div>
            <OpenModalEditReviewButton modalComponent={<EditReviewModal reviewId={review.id} />}/>
            <OpenModalDeleteButton modalComponent={<DeleteReviewModal reviewId={review.id} />}/></div>}
        <br></br>
        </div>
        </>
    )
}


export default ReviewTile;
