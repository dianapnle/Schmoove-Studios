import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllClasses } from "../../store/classes";
import OpenModalAdd from "./OpenModalAdd";
import AddClassModal from "./AddClass";


import ClassTile from "../ClassesCRUD/ClassTile";

function ClassList({ studioId, showEdit }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const classes = useSelector(state => state.classes)
    const sessionUser = useSelector(state => state.session.user)
    const currentStudio = useSelector(state => state.studios[studioId])

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetAllClasses(studioId)).then(() => {
            setIsLoaded(true)
        })

    }, [studioId, dispatch, setIsLoaded])

    return (
        <div className={`classes`}>
        <h2>Our Classes:</h2>
        {showEdit && sessionUser?.id === currentStudio?.ownerId && <div className={`add`}>
        <OpenModalAdd modalComponent={<AddClassModal studioId={studioId}/>} />
        </div>}
        <br></br>
        {!isLoaded || Object.values(classes).length === 0
            ? <div className={`none`}>No classes yet!</div>
            : Object.values(classes).map((el) => (
            <ClassTile key={`${el.id}`} studioId={studioId} classId={el.id} showEdit={showEdit} />
        ))}
        </div>
    )

}

export default ClassList;
