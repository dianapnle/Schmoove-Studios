import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkGetAllInstructors, thunkGetAllStudioInstructors, thunkCreateInstructor, thunkDeleteInstructor, thunkUpdateInstructor } from "../../store/instructors";
// import './CreateStudio.css'




const EditInstructorModal = ({studioId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ name, setName] = useState('')
    const [ profilePic, setProfilePic ] = useState('')
    const [ userId, setUserId ] = useState('')
    const [ hasSubmitted, setHasSubmitted ] = useState(false)
    const [ errors, setErrors ] = useState({})

    const sessionUser = useSelector(state => state.session.user);
    const allInstructors = useSelector(state => state.users);

    const filteredInstructors = [];

    for (const instructor of Object.values(allInstructors)) {
      if (studioId === instructor.studioId) {
          filteredInstructors.push(instructor)
      }
    }


    useEffect(() => {
        //grab the studio's instructors AND all instructors

         dispatch(thunkGetAllStudioInstructors(studioId)).then(() => {
        thunkGetAllInstructors()
         })

    }, [dispatch, studioId])





    useEffect(() => {
        const errors = {};

        if (userId) errors.user = "An instructor must be selected!"
        if (name.length < 2 || name.length > 50) errors.name = 'Name must be between 2 and 50 characters in length';
        if ((!profilePic) || ( profilePic && (!profilePic.endsWith('.png') && !profilePic.endsWith('.PNG')  && !profilePic.endsWith('.JPEG') && !profilePic.endsWith('.jpg') && !profilePic.endsWith('.JPG') && !profilePic.endsWith('.jpeg')))) errors.profilePic = 'Image URL must end in .png, .jpg, or .jpeg';
        setErrors(errors)

      }, [userId, name, profilePic])


    if (sessionUser) {

     const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.values(errors).length) {
            return
        }


        const instructor = {
            studioId: studioId,
            name,
            userId,
            profilePic
          }


        dispatch(thunkCreateInstructor(payload, studioId));
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
          <div className="labels">Studio Name</div>
          <select onChange={ (e) => int(setUserId(e.target.value)) }>
          {allInstructors.map((instructor) =>
            <option value={instructor.userId}>{instructor.name}</option>)}
          </select>
          </label>
          {hasSubmitted===true && errors.name && <div className={`errors`}>{errors.name}</div>}
          </div>
          <div className="area">
          <label>
          <div className="labels">Logo</div>
          <input
            type="text"
            value={logo}
            className="input-field"
             placeholder="Logo"
            onChange={(e) => setLogo(e.target.value)}
          />
          </label>
          {hasSubmitted===true && errors.logo && <div className={`errors`}>{errors.logo}</div>}
          </div>
          <div className="area">
          <label>
          <div className="labels">Pic</div>
          <input
            type="text"
            value={pic}
            className="input-field"
             placeholder="Picture"
            onChange={(e) => setPic(e.target.value)}
          />
          </label>
          {hasSubmitted===true && errors.pic && <div className={`errors`}>{errors.pic}</div>}
          </div>
          <div className="area">
          <label>
          <div className="labels">Description</div>
          <input
            type="text"
            value={description}
            className="input-field"
             placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          </label>
          {hasSubmitted===true && errors.description && <div className={`errors`}>{errors.description}</div>}
          </div>
          <div className="buttons-container">
        <button type="submit" className="submit-btn" >Update Studio</button>
        </div>
          </form>
        <span className="sp sp-t"></span>
			<span className="sp sp-r"></span>
			<span className="sp sp-b"></span>
			<span className="sp sp-l"></span>

        </div>
    )}

}

export default EditInstructorModal
