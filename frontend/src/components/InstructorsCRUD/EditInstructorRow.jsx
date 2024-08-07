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
        <div className='instructor-row'>
        <form>
          <div className="child">
          <label>
          <span className="labels-row"><span>{instructor.firstName}</span> Profile Pic Url </span>
            <input
              type="text"
              value={profilePic}
              className="input"
              placeholder="Profile Picture"
              onChange={(e) => setProfilePic(e.target.value)}
            />
          </label>
        <span className="buttons-container">
        <span><button type="submit" className="save-btn" onClick={handleSubmit}>Save</button></span><span><button type="submit" className="delete-btn" onClick={handleDelete}>Delete</button></span>
        </span>
          {hasSubmitted===true && errors.profilePic && <div className={`errors`}>{errors.profilePic}</div>}
          </div>
          </form>
        </div>
    )}

}

export default EditInstructorRow
