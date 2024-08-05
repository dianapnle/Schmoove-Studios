import { useNavigate } from 'react-router-dom';
import './StudioTile.css'

function StudioTile ({studio}) {
    const navigate = useNavigate();


    if (!studio.avgStarRating) {
        studio.avgStarRating=0.0
    }

    return (
        <>
        <div onClick={() => {navigate(`/studios/${studio.id}`)}} data-text={studio.name} className={`studioTileContainer tooltip`}>
            <div className={`studioitem`}>
                <img className={`studiologo`} src={`${studio.logo}`}/>
                <img className={`studiopic`} src={`${studio.pic}`}/>
                <div>
                    <div className={`top-text`}>
                        <div className={`location`}>{studio.name}, {studio.description}</div>
                        {studio.avgStarRating === 0.0
                ? <div>★ New</div>
                : <div className={`rating`}>★ {studio.avgStarRating?.toFixed(1)}</div>
                }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export default StudioTile;
