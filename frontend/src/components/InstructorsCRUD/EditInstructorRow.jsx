import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkGetAllStudioInstructors, thunkDeleteInstructor, thunkUpdateInstructor } from "../../store/instructors";
// import './CreateStudio.css'




const EditInstructorRow = ({instructorId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ profilePic, setProfilePic ] = useState('')
    const [ hasSubmitted, setHasSubmitted ] = useState(false)
    const [ errors, setErrors ] = useState({})

    const sessionUser = useSelector(state => state.session.user);
    const instructor = useSelector(state => state.instructors[instructorId])

    useEffect(() => {
         setProfilePic(instructor.profilePic);
  }, [dispatch])


    useEffect(() => {
        const errors = {};

        if ((!profilePic) || ( profilePic && (!profilePic.endsWith('.png') && !profilePic.endsWith('.PNG')  && !profilePic.endsWith('.JPEG') && !profilePic.endsWith('.jpg') && !profilePic.endsWith('.JPG') && !profilePic.endsWith('.jpeg')))) errors.profilePic = 'Image URL must end in .png, .jpg, or .jpeg';
        setErrors(errors)

      }, [profilePic])


    if (sessionUser) {

     const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.values(errors).length) {
            return
        }


        const updatedInstructor = {
            userId: instructor.userId,
            studioId: instructor.studioId,
            profilePic
          }


        dispatch(thunkUpdateInstructor(updatedInstructor, instructorId));
        setErrors({});
        setHasSubmitted(false)
      };

      const handleDelete = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        dispatch(thunkDeleteInstructor(instructorId));
        setHasSubmitted(false)
      }


    return (
        <div className='modal-login'>
        <br></br>
        <form>
            <div>
                {instructor.firstName}
            </div>
          <div className="area">
          <label>
          <div className="labels">Profile Pic Url</div>
            <input
              type="text"
              value={profilePic}
              className="input-field"
              placeholder="Profile Picture"
              onChange={(e) => setProfilePic(e.target.value)}
            />
          </label>
          {hasSubmitted===true && errors.profilePic && <div className={`errors`}>{errors.profilePic}</div>}
          </div>
          <div className="buttons-container">
        <button type="submit" className="submit-btn" onClick={handleSubmit}>Save</button> <button type="submit" className="submit-btn" onClick={handleDelete}>Delete</button>
        </div>
          </form>

        </div>
    )}

}

export default EditInstructorRow
