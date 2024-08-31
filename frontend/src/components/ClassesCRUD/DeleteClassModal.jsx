import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteClass } from '../../store/classes';
// import './CreateStudio.css'



function DeleteClassModal ({ classId }) {
    const dispatch = useDispatch();

    const { closeModal } = useModal();

    const deleteSubmit = (e) => {
        e.preventDefault();
        return dispatch((thunkDeleteClass(classId))).then((closeModal))
      };

    return (
        <>
        <div className={`delete-modal`}>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to remove this class?</h3>
        <div className={`buttons`}>
          <div>
            <button className={`delete-post-button`} onClick={deleteSubmit}>Yes (Delete Class) </button>
            </div>
            <br></br>
            <div>
            <button className={`no-post-button`} onClick={closeModal}>No (Keep Class) </button>
            </div>
        </div>
        </div>
        </>
    )
}
export default DeleteClassModal;
