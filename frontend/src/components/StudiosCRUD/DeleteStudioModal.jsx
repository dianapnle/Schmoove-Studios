import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteStudio } from '../../store/studios';



function DeleteStudioModal ({ studioId }) {
    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const deleteSubmit = (e) => {
        e.preventDefault();
        return dispatch((thunkDeleteStudio(studioId))).then((closeModal))
      };

    return (
        <>
        <div className={`delete-modal`}>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to remove this studio?</h3>
        <div className={`buttons`}>
          <div>
            <button className={`delete-post-button`} onClick={deleteSubmit}>Yes (Delete Studio) </button>
            </div>
            <br></br>
            <div>
            <button className={`no-post-button`} onClick={closeModal}>No (Keep Studio) </button>
            </div>
        </div>
        </div>
        </>
    )
}
export default DeleteStudioModal;
