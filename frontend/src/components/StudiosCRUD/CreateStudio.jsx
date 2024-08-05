import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkCreateStudio } from "../../store/studios";




const CreateStudioModal = () => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ name, setName] = useState('')
    const [ logo, setLogo ] = useState('')
    const [ pic, setPic ] = useState('')
    const [ description, setDescription] = useState('')
    const [ hasSubmitted, setHasSubmitted ] = useState(false)
    const [ errors, setErrors ] = useState({})

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        const errors = {};

        if (!name) errors.name = 'Name must be between 2 and 50 characters in length';
        if (!description) errors.description = 'Description is required';
        if (pic && (!pic.endsWith('.png') && !pic.endsWith('.jpg') && !pic.endsWith('.jpeg'))) errors.pic = 'Image URL must end in .png, .jpg, or .jpeg';
        if (logo && (!logo.endsWith('.png') && !logo.endsWith('.jpg') && !logo.endsWith('.jpeg'))) errors.logo = 'Image URL must end in .png, .jpg, or .jpeg';
        setErrors(errors)

      }, [description, name, pic, logo])


    if (sessionUser) {

     const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (Object.values(errors).length) {
            return
        }


        const studio = {
            ownerId: sessionUser.id,
            name,
            logo,
            pic,
            description
          }


        dispatch(thunkCreateStudio(studio));
        closeModal();
        setErrors({});
        setHasSubmitted(false)
      };


    return (
        <div className='modal-login'>
        <h1>Create A Studio</h1>
<form onSubmit={handleSubmit}>
        <label>
          <div>Studio Name</div>
          <input
            type="text"
            value={name}
            className="input-field"
             placeholder="Studio Name"
            onChange={(e) => setName(e.target.value)}
          />
          </label>
          {hasSubmitted===true && errors.name && <div className={`errors`}>{errors.name}</div>}
          <label>
          <div>Logo</div>
          <input
            type="text"
            value={logo}
            className="input-field"
             placeholder="Logo"
            onChange={(e) => setLogo(e.target.value)}
          />
          </label>
          {hasSubmitted===true && errors.logo && <div className={`errors`}>{errors.logo}</div>}
          <label>
          <div>Pic</div>
          <input
            type="text"
            value={pic}
            className="input-field"
             placeholder="Picture"
            onChange={(e) => setPic(e.target.value)}
          />
          </label>
          {hasSubmitted===true && errors.logo && <div className={`errors`}>{errors.logo}</div>}
          <label>
          <div>Description</div>
          <input
            type="text"
            value={description}
            className="description"
             placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          </label>
          {hasSubmitted===true && errors.description && <div className={`errors`}>{errors.description}</div>}
          <div className="buttons-container">
        <button type="submit" className="submit-btn" >Create Studio</button>
        </div>
          </form>
        <span className="sp sp-t"></span>
			<span className="sp sp-r"></span>
			<span className="sp sp-b"></span>
			<span className="sp sp-l"></span>

        </div>
    )}

}

export default CreateStudioModal
