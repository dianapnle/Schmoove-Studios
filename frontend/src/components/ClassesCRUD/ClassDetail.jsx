import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import { thunkGetAClass } from "../../store/classes";

import './StudioDetail.css'

function ClassDetail () {
    const {classId} = useParams();
    const id = Number(classId)
    console.log(classId)
    const el = useSelector(state => state.classes[id]);
    // const sessionUser = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(thunkGetAClass(id))
        .then(() => {
            setIsLoaded(true)
        })
    }, [id, dispatch, isLoaded])


    return (
        <>
        <div className={`overallContainer`}>
            <div className="contentBody">
            <div className={`instructors-area`}>
                {el?.name} {el?.description}, {el?.DanceStyles[0].name}
            <br></br>
            <div className={`classes`}>
            <h2>Scheduled Classes:</h2>
            {/* { Object.values(classes).map((el) => (
                <span></span>
            ))} */}
            </div>
            <br></br>
            </div>
            </div>
        </div>
        </>
    )
}

export default ClassDetail;
