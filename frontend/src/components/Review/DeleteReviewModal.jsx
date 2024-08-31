import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteReview } from '../../store/reviews';
import { getStudioDetail } from '../../store/studios';
import './ReviewStudioModal.css'


function DeleteReviewModal ({ reviewId, studioId }) {
    const dispatch = useDispatch();

    const { closeModal } = useModal();
    const deleteSubmit = (e) => {
        e.preventDefault();
        return dispatch((thunkDeleteReview(reviewId)))
        .then(() => dispatch(getStudioDetail(studioId)))
        .then((closeModal))
      };

    return (
        <>
        <div className={`delete-modal`}>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this review?</h3>
        <div className={`buttons`}>
          <div>
            <button className={`delete-review-button`} onClick={deleteSubmit}>Yes (Delete Review) </button>
            </div>
            <br></br>
            <div>
            <button className={`no-review-button`} onClick={closeModal}>No (Keep Review) </button>
            </div>
        </div>
        </div>
        </>
    )
}
export default DeleteReviewModal;
