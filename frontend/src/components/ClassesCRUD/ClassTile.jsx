import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetAClass } from "../../store/classes";
import './ClassDetail.css'


function ClassTile ({ classId }) {
    const id = Number(classId)
    const navigate = useNavigate();
    const el = useSelector(state => state.classes[id]);
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("id", classId)
        dispatch(thunkGetAClass(id))
        .then(() => {
            setIsLoaded(true)
        })
    }, [id, dispatch, isLoaded])


    return (
        <>
        <div onClick={() => {navigate(`/classes/${el.id}`)}} data-text={el?.name} className={`classOverallContainer`}>
            <div className='title'>
            <div className={`pricing-stars`}>
                <h2>{el?.name}</h2>
            </div>
            <br></br>
            </div>
        <div className={`studios-area`}>
        <br></br>
        <div className={`imgContainer`}>
                <div className="classes">{el?.name}, {el?.description}, {el?.DanceStyles[0]?.name}, {el?.DanceStyles[1]?.name}, with {el?.Instructor?.firstName}</div>
        </div>
        <br></br>
            </div>
        </div>
        </>
    )
}

export default ClassTile;
