import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkUpdateClass } from "../../store/classes";
import { thunkGetAllDanceStyles } from "../../store/dancestyles";
import { thunkGetAllStudioInstructors } from "../../store/instructors";

import "./EditClassModal.css"




const EditClassModal = ({classId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ instructorId, setInstructorId ] = useState('')
    const [ danceStyle1, setDanceStyle1 ] = useState('')
    const [ danceStyle2, setDanceStyle2 ] = useState('')
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const dancestyles = useSelector(state => state.dancestyles);
    const filteredInstructors = useSelector(state => state.instructors);
    const el = useSelector(state => state.classes[classId]);
    const [ errors, setErrors ] = useState({})
    const intensity = [];
    const styles = [];
    const dropDownInstructors = []
    const sessionUser = useSelector(state => state.session.user);




    for (let i = 0; i < Object.values(dancestyles).length - 6; i++) {
      if (Object.values(dancestyles)[i].id !== el.DanceStyles[0].id) {
        intensity.push(Object.values(dancestyles)[i])
      }
    }

    for (let i = 3; i < Object.values(dancestyles).length; i++) {
      if (Object.values(dancestyles)[i].id !== el.DanceStyles[1].id) {
        styles.push(Object.values(dancestyles)[i])
      }
    }

    for (let i = 0; i < Object.values(filteredInstructors).length; i++) {
      if (Object.values(filteredInstructors)[i].id !== el.instructorId) {
        dropDownInstructors.push(Object.values(filteredInstructors)[i])
      }
    }



    useEffect(() => {
         dispatch(thunkGetAllStudioInstructors(el.studioId)).then(() => {
         dispatch(thunkGetAllDanceStyles());
         setName(el.name);
         setDescription(el.description);
         setDanceStyle1(el.DanceStyles[0].id)
         setDanceStyle2(el.DanceStyles[1].id);
         setInstructorId(el.instructorId)
         })

    }, [dispatch])


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


        const updatedClass = {
          name: name,
          description: description,
          instructorId: Number(instructorId),
          studioId: el.studioId,
          danceStyles: [Number(danceStyle1),Number(danceStyle2)]
          }


        dispatch(thunkUpdateClass(updatedClass, classId))
        setErrors({});
        setName('');
        setDescription('');
        setInstructorId('');
        setDanceStyle1('');
        setDanceStyle2('');
        setHasSubmitted(false);
        closeModal();
      };


      const handleClose = async() => {
        closeModal()
      };

    return (
        <div className='modal-instructors'>
        <h1>Modify Classes</h1>
        <br></br>
        <br></br>
        <div className="edit-delete-section">
        <form>
          <div className="child">
          <label>
          <span className="labels-row">Class Name </span>
            <input
              type="text"
              value={name}
              className="class-name"
              placeholder="Class Name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
          <input
              type="text"
              value={description}
              className="class-name"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <div className="labels">Intensity</div>
            <select onChange={(e) => Number(setDanceStyle1(e.target.value)) }>
              <option selected value={danceStyle1}> {el.DanceStyles[0].name }</option>
              {intensity.map((style) =>
              <option key={`${style.id}`} value={style.id}>{style.name}</option>)}
            </select>
        </label>
        <label>
            <div className="labels">Dance Styles</div>
            <select onChange={(e) => Number(setDanceStyle2(e.target.value)) }>
              <option selected value={danceStyle2}> {el.DanceStyles[1].name } </option>
              {styles.map((style) =>
              <option key={`${style.id}`} value={style.id}>{style.name}</option>)}
            </select>
        </label>
        <label>
            <div className="labels">Add / Available Instructors</div>
            <select onChange={(e) => Number(setInstructorId(e.target.value)) }>
              {/* <option disabled selected value> -- select an option -- </option> */}
              <option selected value={instructorId}> {el.Instructor.firstName} </option>
              {Object.values(dropDownInstructors).map((instructor) =>
              <option key={`class-${instructor.id}`} value={instructor.id}>{instructor.firstName}</option>)}
            </select>
        </label>
        <span className="buttons-container">
        <span><button type="submit" className="save-btn" onClick={handleSubmit}>Save</button></span><span></span>
        </span>
          {hasSubmitted===true && errors.name && <div className={`errors`}>{errors.profilePic}</div>}
          </div>
          </form>
        </div>
        <br></br>
        <div className="child">
        <button onClick={handleClose} type="submit" className="close-btn">Close</button>
        </div>
        </div>
    )}

}

export default EditClassModal
