import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkGetAClass } from "../../store/classes";
import './ClassDetail.css'
import OpenModalEditClassButton from '../ClassesCRUD/OpenModalEditClass'
import OpenModalDeleteButton from "../StudiosCRUD/OpenModalDeleteStudio";
import DeleteClassModal from "../ClassesCRUD/DeleteClassModal"
import EditClassModal from "./EditClassModal";


function ClassTile ({ classId, showEdit }) {
    const id = Number(classId)
    const navigate = useNavigate();
    const el = useSelector(state => state.classes[id]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAClass(classId)).then(() => {
        })
    }, [dispatch, classId])

    return (
        <div className={`classOverallContainer`}>
        {/* {showEdit && <div><button> Edit Class</button></div>} */}
        {showEdit && <div className='top-container'>
            <OpenModalEditClassButton modalComponent={<EditClassModal classId={classId}/>} />
            <OpenModalDeleteButton modalComponent={<DeleteClassModal classId={classId}/>}/>
        </div>}
        <div onClick={() => {navigate(`/classes/${el.id}`)}} data-text={el?.name} >
            <div>
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
