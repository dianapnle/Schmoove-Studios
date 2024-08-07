import { useState } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetAllStudios } from '../../store/studios.js';
import StudioTile from   './StudioTile.jsx';
import './AllStudiosBrowser.css'
import maingraphic from '/home/dianapnle/projects/UrbanSteps/frontend/images/maingraphic.jpg'


function StudiosBrowser () {
    const dispatch = useDispatch();
    const studios = useSelector(state => state.studios);
    const [isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        dispatch(thunkGetAllStudios()).then(() => {
            setIsLoaded(true)
        })
    }, [isLoaded, dispatch])

    return (
        <>
        <h2></h2>
        <div className="body">
        <div className="image-container">
            <img className="maingraphic" src={maingraphic}/>
            <div className="overlay-text"> Text</div>
        </div>

        <div className={`studioscontainer`}>
        { Object.values(studios).map((studio) => (
            <StudioTile key={`${studio.id}`} studio={studio} />
        ))}
        </div>
        </div>
        </>
    )
}

export default StudiosBrowser;
