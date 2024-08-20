import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetAClass } from "../../store/classes";
import './ClassDetail.css'
import OpenModalEditClassButton from '../ClassesCRUD/OpenModalEditClass'
import EditClassModal from "./EditClassModal";


function ClassTile ({ classId, showEdit }) {
    const id = Number(classId)
    const navigate = useNavigate();
    const el = useSelector(state => state.classes[id]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAClass(classId)).then(() => {
        })
    }, [dispatch])

    return (
        <div className={`classOverallContainer`}>
        {/* {showEdit && <div><button> Edit Class</button></div>} */}
        {showEdit && <div><OpenModalEditClassButton modalComponent={<EditClassModal classId={classId}/>} /></div>}
        <div className='top-container' onClick={() => {navigate(`/classes/${el.id}`)}} data-text={el?.name} >
            <div className='top-container'>
            <span><h2>{el?.name} with {el?.Instructor?.firstName}</h2></span>
            <h4>Styles: {el?.DanceStyles[0]?.name}, {el?.DanceStyles[1]?.name}</h4>
            </div>
        <div className={`studios-area`}>
        <br></br>
        <div className={`imgContainer`}>
                <div className="classes"><span></span>{el?.description}</div>
        </div>
        <br></br>
            </div>
        </div>
        </div>
    )
}

export default ClassTile;
