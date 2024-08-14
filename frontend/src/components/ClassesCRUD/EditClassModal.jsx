import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkGetAllClasses, thunkCreateClass } from "../../store/classes";
import { thunkGetAllInstructors } from "../../store/users";





const EditClassModal = ({studioId}) => {

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

      const foundUserIds = new Set(Object.values(filteredInstructors).map((instructor) => instructor.userId));
      // filter out user objects that were already added (based on userId)
      const dropDownUsers = Object.values(allInstructors).filter((user) => !foundUserIds.has(user.id));

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


        dispatch(thunkCreateInstructor(payload, studioId))
        setErrors({});
        setUserId('');
        setProfilePic('')
        setHasSubmitted(false)
      };


      const handleClose = async() => {
        closeModal()
      };

    return (
        <div className='modal-instructors'>
        <h1>Modify Instructors</h1>
        <br></br>
        <form>
        <div className="add">
        <div className="child">
        <label>
            <div className="labels">Available Instructors</div>
            <select onChange={(e) => Number(setUserId(e.target.value)) }>
              <option disabled selected value> -- select an option -- </option>
              {Object.values(dropDownUsers).map((instructor) =>
              <option key={`${instructor.id}`}value={instructor.id}>{instructor.firstName}</option>)}
            </select>
        </label>
          {hasSubmitted===true && errors.user && <div className={`errors`}>{errors.user}</div>}
          </div>
        <div className="child">
          <label>
          <div className="labels">Profile Pic Url</div>
            <input
              type="text"
              value={profilePic}
              className="input-add"
              placeholder="Profile Picture"
              onChange={(e) => setProfilePic(e.target.value)}
            />
          </label>
          {hasSubmitted===true && errors.profilePic && <div className={`errors`}>{errors.profilePic}</div>}
          </div>
        <div className="add-container">
        <button onClick={handleSubmit} type="submit" className="add-btn">Add</button>
        </div>
        </div>
        </form>
          <br></br>
        <div className="edit-delete-section">
        {Object.values(filteredClasses).map((el) => (
            <EditClass key={`${el.id}`} classId={el.id} />
          ))}
        </div>
        <div className="child">
        <button onClick={handleClose} type="submit" className="close-btn">Close</button>
        </div>
        </div>
    )}

}

export default EditClassModal
