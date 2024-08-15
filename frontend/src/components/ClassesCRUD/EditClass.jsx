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
    const [ hasSubmitted, setHasSubmitted ] = useState(false)
    const [ errors, setErrors ] = useState({})
    const dancestyles = useSelector(state => state.dancestyles)
    const sessionUser = useSelector(state => state.session.user);
    const filteredInstructors = useSelector(state => state.instructors[studioId])

    useEffect(() => {
      dispatch(thunkGetAllClasses(studioId));
      dispatch(thunkGetAllDanceStyles());

  }, [])


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
            instructorId: Number(instructorId),
            studioId: studioId,
            profilePic
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
        <div className='instructor-row'>
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
            <div className="labels">Dance Styles</div>
            <select onChange={(e) => Number(setUserId(e.target.value)) }>
              <option disabled selected value> -- select an option -- </option>
              {Object.values(dancestyles).map((style) =>
              <option key={`${style.id}`}value={style.id}>{style.name}</option>)}
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
