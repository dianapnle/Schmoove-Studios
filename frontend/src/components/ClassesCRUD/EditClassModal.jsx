import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkGetAllClasses, thunkCreateClass } from "../../store/classes";
import { thunkGetAllStudioInstructors } from "../../store/instructors";
import EditClass from "./EditClass";




const EditClassModal = ({studioId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ instructorId, setInstructorId ] = useState('')
    const [ hasSubmitted, setHasSubmitted ] = useState(false)
    const [ errors, setErrors ] = useState({})

    const sessionUser = useSelector(state => state.session.user);
    // const allInstructors = useSelector(state => state.users);
    const filteredClasses = useSelector(state => state.classes)


    useEffect(() => {
        //grab the studio's instructors AND all instructors

         dispatch(thunkGetAllStudioInstructors(studioId)).then(() => {
         dispatch(thunkGetAllClasses(studioId))
         })

    }, [dispatch, studioId])


    useEffect(() => {
        const errors = {};

        if (!name) errors.name = 'Name is required';
        if (!description) errors.description = 'Description is required';
        setErrors(errors)
      }, [name, description])

      // const foundUserIds = new Set(Object.values(filteredInstructors).map((instructor) => instructor.userId));
      // // filter out user objects that were already added (based on userId)
      // const dropDownUsers = Object.values(allInstructors).filter((user) => !foundUserIds.has(user.id));

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


        // dispatch(thunkCreateInstructor(payload, studioId))
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
        <h1>Modify Classes</h1>
        <br></br>
        <form>
        <div className="edit-delete-section">
        {Object.values(filteredClasses).map((el) => (
            <EditClass key={`${el.id}`} classId={el.id} studioId={studioId} />
          ))}
        </div>
        </form>
          <br></br>
        <div className="child">
        <button onClick={handleClose} type="submit" className="close-btn">Close</button>
        </div>
        </div>
    )}

}

export default EditClassModal
