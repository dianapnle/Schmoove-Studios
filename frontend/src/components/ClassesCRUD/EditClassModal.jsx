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

    }, [dispatch, el.name, el.description, el.DanceStyles, el.studioId, el.instructorId ])


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


    return (
        <div className='modal-classes'>
        <h1>Modify Class</h1>
        <form>
          <div className="class-area">
            <label>
            <div className="labels">Class Name</div>
              <input
                type="text"
                value={name}
                className="class-name"
                placeholder="Class Name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {hasSubmitted===true && errors.name && <div className={`errors`}>{errors.name}</div>}
          </div>
          <div className="class-area">
          <label>
          <div className="labels description">Description</div>
          <textarea
              type="text"
              value={description}
              className="class-description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
          {hasSubmitted===true && errors.description && <div className={`errors`}>{errors.description}</div>}
          </div>
          <div className="drop-area-class">
          <label>
            <div className="labels intensity">Intensity</div>
            <select onChange={(e) => Number(setDanceStyle1(e.target.value)) }>
              <option className={`class-options-dropdown`} selected value={danceStyle1}> {el.DanceStyles[0].name }</option>
              {intensity.map((style) =>
              <option className={`class-options-dropdown`} key={`${style.id}`} value={style.id}>{style.name}</option>)}
            </select>
        </label>
        </div>
        <div className="drop-area-class">
        <label>
            <div className="labels">Dance Styles</div>
            <select onChange={(e) => Number(setDanceStyle2(e.target.value)) }>
              <option className={`class-options-dropdown`} selected value={danceStyle2}> {el.DanceStyles[1].name } </option>
              {styles.map((style) =>
              <option className={`class-options-dropdown`} key={`${style.id}`} value={style.id}>{style.name}</option>)}
            </select>
        </label>
        </div>
        <div className="drop-area-class">
        <label>
            <div className="labels">Add / Available Instructors</div>

            <select onChange={(e) => Number(setInstructorId(e.target.value)) }>
              {/* <option disabled selected value> -- select an option -- </option> */}
              <option className={`class-options-dropdown`} selected value={instructorId}> {el.Instructor.firstName} </option>
              {Object.values(dropDownInstructors).map((instructor) =>
              <option className={`class-options-dropdown`} key={`class-${instructor.id}`} value={instructor.id}>{instructor.firstName}</option>)}
            </select>
        </label>
        </div>
        <div className="buttons-container">
        <button type="submit" className="save-btn" onClick={handleSubmit}>Save</button>
        </div>
        </form>
        </div>
    )}

}

export default EditClassModal
