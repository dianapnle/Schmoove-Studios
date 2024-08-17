import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { thunkDeleteInstructor, thunkUpdateInstructor } from "../../store/instructors";
import { thunkGetAllDanceStyles } from "../../store/dancestyles";
import { thunkUpdateClass, thunkDeleteClass, thunkGetAllClasses } from "../../store/classes";
// import './CreateStudio.css'




const EditClass = ({classId, studioId}) => {
    const dispatch = useDispatch();
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ instructorId, setInstructorId ] = useState('')
    const [ danceStyle1, setDanceStyle1 ] = useState('')
    const [ danceStyle2, setDanceStyle2 ] = useState('')
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const el = useSelector(state => state.classes[classId])
    const [ errors, setErrors ] = useState({});


    const dancestyles = useSelector(state => state.dancestyles);
    const sessionUser = useSelector(state => state.session.user);
    const filteredInstructors = useSelector(state => state.instructors[studioId]);

    const intensity = [];
    const styles = [];

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


    useEffect(() => {
      dispatch(thunkGetAllClasses(studioId));
      dispatch(thunkGetAllDanceStyles());
      setName(el.name);
      setDescription(el.description);
      setDanceStyle1(el.DanceStyles[0].id)
      setDanceStyle2(el.DanceStyles[1].id)
  }, [dispatch])


    useEffect(() => {
        const errors = {};

        if (!name) errors.name = 'Name is required';
        if (!description) errors.description = 'Description is required';
        setErrors(errors)

      }, [name, description])


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
            studioId: studioId,
            danceStyles: [danceStyle1, danceStyle2]
          }


        dispatch(thunkUpdateClass(updatedClass, classId));
        setErrors({});
        setHasSubmitted(false)
      };

      const handleDelete = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        dispatch(thunkDeleteClass(classId));
        setHasSubmitted(false)
      }


    return (
        <div className='class-row'>
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
        <span className="buttons-container">
        <span><button type="submit" className="save-btn" onClick={handleSubmit}>Save</button></span><span><button type="submit" className="delete-btn" onClick={handleDelete}>Delete</button></span>
        </span>
          {hasSubmitted===true && errors.name && <div className={`errors`}>{errors.profilePic}</div>}
          </div>
          </form>
        </div>
    )}
}

export default EditClass
