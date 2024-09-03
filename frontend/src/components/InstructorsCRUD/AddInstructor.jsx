import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkGetAllStudioInstructors, thunkCreateInstructor } from "../../store/instructors";
import { thunkGetAllInstructors } from "../../store/users";
import './EditInstructorModal.css'




const AddInstructorModal = ({studioId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ profilePic, setProfilePic ] = useState('')
    const [ userId, setUserId ] = useState('select_an_option')
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


          const foundUserIds = new Set(Object.values(filteredInstructors).map((instructor) => instructor.userId));
          // filter out user objects that were already added (based on userId)
          const dropDownUsers = Object.values(allInstructors).filter((user) => !foundUserIds.has(user.id));

    useEffect(() => {
        const errors = {};

        if (userId === 'select_an_option') errors.user = "An instructor must be selected!"
        if (profilePic === undefined) errors.profilePic = 'Image needed in .png, .jpg, or .jpeg';
        setErrors(errors)
      }, [userId, profilePic])

    if (sessionUser) {

     const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.values(errors).length) {
            return
        }


        const payload = {
            studioId: studioId,
            userId: Number(userId),
            profilePic
          }


          setErrors({});
          setUserId('select_an_option');
          setHasSubmitted(false);
          dispatch(thunkCreateInstructor(payload, profilePic, studioId)).then(() => closeModal())
      };


      const handleClose = async() => {
        closeModal()
      };

    return (
        <div className='modal-instructors'>
        <h1>Modify Instructors</h1>
        <form>
        <div className="add">
        <div className="child">
        <label>
            <div className="labels">Add Available Instructors</div>
            <select value={userId} onChange={(e) => Number(setUserId(e.target.value)) }>
            <option disabled selected value="select_an_option"> -- select an option -- </option>
              {Object.values(dropDownUsers).map((instructor) =>
              <option key={`${instructor.id}`} value={instructor.id}>{instructor.firstName}</option>)}
            </select>
        </label>
          </div>
        <div className="child">
          <br></br>
          <label>
          <div className="labels">Upload a Profile Pic</div>
            <input
              type="file"
              className="input-add"
              placeholder="Profile Picture"
              onChange={(e) => setProfilePic(e.target.files[0])}
              />
          </label>
          </div>
        </div>
        <div className="error-area">
          {hasSubmitted===true && errors.user && <div className={`errors`}>{errors.user}</div>}
          {hasSubmitted===true && errors.profilePic && <div className={`errors`}>{errors.profilePic}</div>}
        </div>
        </form>
        <div className="child">
        <button onClick={handleSubmit} type="submit" className="instructor-add-btn">Add</button>
        <button onClick={handleClose} type="submit" className="close-btn">Close</button>
        </div>
        </div>
    )}

}

export default AddInstructorModal
