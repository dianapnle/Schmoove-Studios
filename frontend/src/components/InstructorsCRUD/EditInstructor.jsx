import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import EditInstructorRow from "./EditInstructorRow";
import { thunkGetAllStudioInstructors, thunkCreateInstructor } from "../../store/instructors";
import { thunkGetAllInstructors } from "../../store/users";
// import './CreateStudio.css'




const EditInstructorModal = ({studioId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ profilePic, setProfilePic ] = useState('')
    const [ userId, setUserId ] = useState('')
    const [ hasSubmitted, setHasSubmitted ] = useState(false)
    const [ errors, setErrors ] = useState({})

    const sessionUser = useSelector(state => state.session.user);
    const allInstructors = useSelector(state => state.users);
    const filteredInstructors = useSelector(state => state.instructors)


    useEffect(() => {
        //grab the studio's instructors AND all instructors

         dispatch(thunkGetAllStudioInstructors(studioId)).then(() => {
          dispatch(thunkGetAllInstructors())
         })

    }, [dispatch, studioId])



    useEffect(() => {
        const errors = {};

        if (!userId) errors.user = "An instructor must be selected!"
        if ((!profilePic) || ( profilePic && (!profilePic.endsWith('.png') && !profilePic.endsWith('.PNG')  && !profilePic.endsWith('.JPEG') && !profilePic.endsWith('.jpg') && !profilePic.endsWith('.JPG') && !profilePic.endsWith('.jpeg')))) errors.profilePic = 'Image URL must end in .png, .jpg, or .jpeg';
        setErrors(errors)

      }, [userId, profilePic])


    if (sessionUser) {

     const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.values(errors).length) {
            return
        }


        const instructor = {
            studioId: studioId,
            userId,
            profilePic
          }


        dispatch(thunkCreateInstructor(instructor, studioId));
        closeModal();
        setErrors({});
        setHasSubmitted(false)
      };


    return (
        <div className='modal-login'>
        <h1>Modify Instructors</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
        <div className="area">
        <label>
            <div className="labels">Available Instructors</div>
            <select onChange={(e) => Number(setUserId(e.target.value)) }>
              {Object.values(allInstructors).map((instructor) =>
              <option value={instructor.userId}>{instructor.firstName}</option>)}
            </select>
        </label>
          {hasSubmitted===true && errors.user && <div className={`errors`}>{errors.user}</div>}
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
        <button type="submit" className="submit-btn">Add</button>
        </div>
        </form>
        <div>
        {Object.values(filteredInstructors).map((instructor) => (
            <EditInstructorRow instructorId={instructor.id} />
          ))}
        </div>
        </div>
    )}

}

export default EditInstructorModal
