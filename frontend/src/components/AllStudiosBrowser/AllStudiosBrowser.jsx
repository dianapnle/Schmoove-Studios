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
        <div className="body-main">
            <div className="image-container">
                <img className="maingraphic" src={maingraphic}/>
                <div className="overlay-text"> All dance studios in one convenient place.</div>
            </div>
            <div className="intro">
                <p>
                    Here, you will find dance studios near you. Whether you are looking for a place to dance or teach, <br></br>
                    there is a studio on here for you! <br></br>
                    <br></br>
                    Already have a dance studio or are looking to create one? <br></br>
                    Sign up today to get started!
                </p>
            </div>
            <div className="studiolist">
                <div className={`studioscontainer`}>
                { Object.values(studios).map((studio) => (
                    <StudioTile key={`${studio.id}`} studio={studio} />
                ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default StudiosBrowser;
