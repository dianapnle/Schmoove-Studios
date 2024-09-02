import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkCreateStudio } from "../../store/studios";
import './CreateStudio.css'




const CreateStudioModal = () => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [ name, setName] = useState('')
    const [ logo, setLogo ] = useState(undefined)
    const [ pic, setPic ] = useState(undefined)
    const [ description, setDescription] = useState('')
    const [ hasSubmitted, setHasSubmitted ] = useState(false)
    const [ errors, setErrors ] = useState({})

    const sessionUser = useSelector(state => state.session.user);


    const toggle = () => {
      if (name.length < 2 || !description ) {
        return true
      }
      return false
    }

    useEffect(() => {
        const errors = {};

        if (name.length < 2 || name.length > 50) errors.name = 'Name must be between 2 and 50 characters in length';
        if (!description) errors.description = 'Description is required';
        if ((pic === undefined)) errors.pic = 'Image needed in .png, .jpg, or .jpeg';
        if ((logo  === undefined) ) errors.logo = 'Image needed in .png, .jpg, or .jpeg';
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


          dispatch(thunkCreateStudio(studio, logo, pic));
        closeModal();
        setErrors({});
        setHasSubmitted(false)
      };


    return (
        <div className='modal-login'>
          <h1>Create A Studio</h1>
        <form onSubmit={handleSubmit}>
        <div className="area">
          <label>
              <div className="labels">Studio Name</div>
              <input
                type="text"
                value={name}
                className="input-field"
                placeholder="Studio Name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {hasSubmitted===true && errors.name && <div className={`errors`}>{errors.name}</div>}
        </div>
        <div className="area">
        <label>
        <div className="labels">Logo</div>
          <input
            type="file"
            className="file-field"
            placeholder="Logo"
            accept="image/png, image/jpeg"
            onChange={(e) => setLogo(e.target.files[0])}
          />
          </label>
          {hasSubmitted===true && errors.logo && <div className={`errors`}>{errors.logo}</div>}
          </div>
        <div className="area">
            <label>
            <div className="labels">Pic</div>
            <input
              type="file"
              className="file-field"
              placeholder="Picture"
              accept="image/png, image/jpeg"
              onChange={(e) => setPic(e.target.files[0])}
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
        <button type="submit" className="submit-btn" disabled={toggle()}>Create Studio</button>
        </div>
          </form>


        </div>
    )}

}

export default CreateStudioModal
