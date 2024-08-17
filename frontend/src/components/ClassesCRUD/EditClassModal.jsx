import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkGetAllClasses, thunkCreateClass } from "../../store/classes";
import { thunkGetAllStudioInstructors } from "../../store/instructors";
import EditClass from "./EditClass";
import "./EditClassModal.css"




const EditClassModal = ({studioId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ instructorId, setInstructorId ] = useState('')
    const [ danceStyle1, setDanceStyle1 ] = useState('')
    const [ danceStyle2, setDanceStyle2 ] = useState('')
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const dancestyles = useSelector(state => state.dancestyles);
    const filteredInstructors = useSelector(state => state.instructors[studioId]);
    const [ errors, setErrors ] = useState({})
    const intensity = [];
    const styles = [];

    const sessionUser = useSelector(state => state.session.user);
    // const allInstructors = useSelector(state => state.users);
    const filteredClasses = useSelector(state => state.classes)


    for (let i = 0; i < Object.values(dancestyles).length - 6; i++) {
      intensity.push(Object.values(dancestyles)[i])
    }

    for (let i = 3; i < Object.values(dancestyles).length; i++) {
      styles.push(Object.values(dancestyles)[i])
    }

    useEffect(() => {
        //grab the studio's instructors and classes

         dispatch(thunkGetAllStudioInstructors(studioId)).then(() => {
         dispatch(thunkGetAllClasses(studioId))
         })

    }, [dispatch, studioId])


    useEffect(() => {
        const errors = {};

        if (!name) errors.name = 'Name is required';
        if (!description) errors.description = 'Description is required';
        if (!danceStyle1) errors.dancestyle1 = 'Need to select an intensity';
        if (!danceStyle2) errors.dancestyle2 = 'Need to select a style';
        setErrors(errors)
      }, [name, description, danceStyle1, danceStyle2])

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
          name: name,
          description: description,
          instructorId: Number(instructorId),
          studioId: studioId,
          danceStyles: [danceStyle1, danceStyle2]
          }


        dispatch(thunkCreateClass(payload, studioId))
        setErrors({});
        setName('');
        setDescription('');
        setInstructorId('');
        setDanceStyle1('');
        setDanceStyle2('');
        setHasSubmitted(false);
      };


      const handleClose = async() => {
        closeModal()
      };

    return (
        <div className='modal-instructors'>
        <h1>Modify Classes</h1>
        <br></br>
        <form>
        <div className="add-class">
            <div className="labels">Add Class</div>
            <label>
            <input
              type="text"
              value={name}
              className="class-name"
              placeholder="Class Name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {hasSubmitted===true && errors.name && <div className={`errors`}>{errors.name}</div>}
          <label>
          <input
              type="text"
              value={description}
              className="class-name"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          {hasSubmitted===true && errors.description && <div className={`errors`}>{errors.description}</div>}
          <label>
            <div className="labels">Add / Available Instructors</div>
            <select onChange={(e) => Number(setInstructorId(e.target.value)) }>
              <option disabled selected value> -- select an option -- </option>
              {Object.values(filteredInstructors).map((instructor) =>
              <option key={`class-${instructor.id}`} value={instructor.id}>{instructor.firstName}</option>)}
            </select>
        </label>
          <label>
            <div className="labels">Intensity</div>
            <select onChange={(e) => Number(setDanceStyle1(e.target.value)) }>
              <option disabled selected value> -- select an option -- </option>
              {intensity.map((style) =>
              <option key={`${style.id}`} value={style.id}>{style.name}</option>)}
            </select>
          </label>
          {hasSubmitted===true && errors.dancestyle1 && <div className={`errors`}>{errors.dancestyle1}</div>}
        <label>
            <div className="labels">Dance Styles</div>
            <select onChange={(e) => Number(setDanceStyle2(e.target.value)) }>
              <option disabled selected value> -- select an option -- </option>
              {styles.map((style) =>
              <option key={`${style.id}`} value={style.id}>{style.name}</option>)}
            </select>
        </label>
        {hasSubmitted===true && errors.dancestyle2 && <div className={`errors`}>{errors.dancestyle2}</div>}
        <button onClick={handleSubmit} type="submit" className="add-btn">Add</button>
        </div>
        </form>
        <br></br>
        <div className="edit-delete-section">
        {Object.values(filteredClasses).map((el) => (
            <EditClass key={`${el.id}`} classId={el.id} studioId={studioId} />
          ))}
        </div>
        <br></br>
        <div className="child">
        <button onClick={handleClose} type="submit" className="close-btn">Close</button>
        </div>
        </div>
    )}

}

export default EditClassModal
