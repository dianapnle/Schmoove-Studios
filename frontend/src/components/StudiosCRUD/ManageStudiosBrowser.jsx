import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUserStudios } from '../../store/studios.js';
import StudioTile from '../AllStudiosBrowser/StudioTile.jsx';
import { useNavigate } from 'react-router-dom';
import OpenModalDeleteButton from './OpenModalDeleteSpot.jsx';
import OpenModalEditButton from './EditStudioModal.jsx';
import DeleteStudioModal from './DeleteStudioModal.jsx';
import CreateStudioModal from './CreateStudio.jsx';
import EditStudioModal from './EditStudio.jsx';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem.jsx';
import OpenModalEditInstructorButton from '../InstructorsCRUD/EditInstructorModal.jsx';
import EditInstructorModal from '../InstructorsCRUD/EditInstructor.jsx';


function ManageStudiosBrowser () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const studios = useSelector(state => state.studios);
    const instructors = useSelector(state => state.instructors)
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
        <div>
        <div className={`header`}>
        <h2>Manage Studios</h2>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className={`studioscontainer`}>
        {filteredStudios.length === 0 && <div>No Studios Currently Owned! <div>
            <div className={`createstudiolink`}>
            <OpenModalMenuItem
              itemText="Create a New Studio"
              modalComponent={<CreateStudioModal />}
            />
          </div></div></div>}
        {Object.values(filteredStudios).map((studio) => (
            <>
            <div>
            <StudioTile onClick={() => {navigate(`/studio/${studio.id}`)}} key={`${studio.id}`} studio={studio} />
            <div className={`buttons-area`}><span>
                <OpenModalEditButton className={`edit-button`} modalComponent={<EditStudioModal studioId={studio.id}/>}/>
                <OpenModalDeleteButton className={`delete-button`} modalComponent={<DeleteStudioModal studioId={studio.id}/>}/></span></div>
                <OpenModalEditInstructorButton className={'edit-button'} modalComponent={<EditInstructorModal studioId={studio.id}/>}/>
            </div>
            </>
        ))}

        </div>
        </div>
        </>
    )
}

export default ManageStudiosBrowser;
