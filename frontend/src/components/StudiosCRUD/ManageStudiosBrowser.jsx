import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUserStudios } from '../../store/studios.js';
import StudioTile from '../AllStudiosBrowser/StudioTile.jsx';
import { useNavigate } from 'react-router-dom';
import OpenModalDeleteButton from './OpenModalDeleteStudio.jsx';
import OpenModalEditButton from './OpenModalEditButton.jsx';
import DeleteStudioModal from './DeleteStudioModal.jsx';
import CreateStudioModal from './CreateStudio.jsx';
import EditStudioModal from './EditStudio.jsx';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem.jsx';
import OpenModalEditInstructorButton from '../InstructorsCRUD/EditInstructorModal.jsx';
import EditInstructorModal from '../InstructorsCRUD/EditInstructor.jsx';
import './ManageStudiosBrowser.css'



function ManageStudiosBrowser () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const studios = useSelector(state => state.studios);
    const filteredStudios = [];

    if (!sessionUser) {
        navigate('/')
    }

    for (const studio of Object.values(studios)) {
        if (sessionUser && sessionUser.id === studio.ownerId) {
            filteredStudios.push(studio)
        }
    }


    const [isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        dispatch(getCurrentUserStudios()).then(() => {
            setIsLoaded(true)
        })
    }, [isLoaded, dispatch])

    return (
        <>
        <div className="manage-overall">
        <div className={`header`}>
            <h2>Manage Studios</h2>
        </div>
        <br></br>
        <br></br>
        {filteredStudios.length === 0 ?
        (<div className={`nostudios`}>
            <div>No Studios Currently Owned! <div>
                    <div className={`createstudiolink`}>
                    <OpenModalMenuItem
                    itemText="Create a New Studio"
                    modalComponent={<CreateStudioModal />}
                    />
                </div></div></div></div>) :
        (<div className={`managestudioscontainer tooltip`}>
        {Object.values(filteredStudios).map((studio) => (
            <>
            <div>
            <StudioTile onClick={() => {navigate(`/studio/${studio.id}`)}} key={`${studio.id}`} studio={studio} />
            <div className={`manage-buttons-area`}>
                <OpenModalEditButton modalComponent={<EditStudioModal studioId={studio.id}/>}/>
                <OpenModalDeleteButton modalComponent={<DeleteStudioModal studioId={studio.id}/>}/>
                <OpenModalEditInstructorButton modalComponent={<EditInstructorModal studioId={studio.id}/>}/>
                <button className={`edit-class-button`} onClick={() => {navigate(`/studios/edit/${studio.id}`)}} key={`${studio.id}`}>Edit Classes </button>
                </div>
            </div>
            </>
        ))}
        </div>)}

        </div>
        </>
    )
}

export default ManageStudiosBrowser;
