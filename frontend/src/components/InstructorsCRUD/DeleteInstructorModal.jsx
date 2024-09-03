import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { thunkDeleteInstructor } from '../../store/instructors';





function DeleteInstructorModal ({ instructorId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [ errors, setErrors ] = useState({});
    const { closeModal } = useModal();

    if (sessionUser) {

    const deleteSubmit = (e) => {
        e.preventDefault();
        return dispatch(thunkDeleteInstructor(instructorId)).then((closeModal))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.message) {
            setErrors({message: data.message});
          }
        })
      };

    return (
        <>
        <div className={`delete-modal`}>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to remove this instructor?</h3>
        {errors.message && <div className={`errors`}>{errors.message}</div>}
        <div className={`buttons`}>
          <div>
            <button className={`delete-post-button`} onClick={deleteSubmit}>Yes (Delete Instructor) </button>
            </div>
            <br></br>
            <div>
            <button className={`no-post-button`} onClick={closeModal}>No (Keep Instructor) </button>
            </div>
        </div>
        </div>
        </>
    )}
}
export default DeleteInstructorModal;
