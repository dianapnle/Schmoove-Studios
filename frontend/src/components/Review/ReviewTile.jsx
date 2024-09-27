// import { useNavigate } from 'react-router-dom';
import './ReviewTile.css'
import { useSelector } from 'react-redux'
import OpenModalDeleteButton from '../StudiosCRUD/OpenModalDeleteStudio.jsx'
import DeleteReviewModal from './DeleteReviewModal.jsx'
import OpenModalEditReviewButton from './OpenEditModal.jsx'
import EditReviewModal from './EditReviewModal.jsx'

function ReviewTile({ reviewId, studioId }) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const id = Number(reviewId)
  const review = useSelector((state) => state.reviews[id])

  const date = new Date(review?.updatedAt)
  const sessionUser = useSelector((state) => state.session.user)

  return (
    <>
      <div className={`reviewitem`}>
        <div className={`top-review-area`}>
          <div className={`review-user`}>
            {review.User?.firstName}{' '}
            <span className={`review-body`}>
              <span className='star'>★</span> {review?.rating}
            </span>
          </div>
          <div className={`edit-review-area`}>
            {sessionUser?.id === review.userId && (
              <div className={`edit-review-buttons`}>
                <OpenModalEditReviewButton
                  modalComponent={
                    <EditReviewModal reviewId={review.id} studioId={studioId} />
                  }
                />
                <OpenModalDeleteButton
                  modalComponent={
                    <DeleteReviewModal
                      reviewId={review.id}
                      studioId={studioId}
                    />
                  }
                />
              </div>
            )}
          </div>
        </div>
        <div className={`review-date-area`}>
          <span className={`review-date`}>
            {monthNames[date.getMonth()]} {date.getFullYear()}
          </span>
        </div>
        <div className={`review-body review-text`}> {review?.review}</div>
      </div>
    </>
  )
}

export default ReviewTile
