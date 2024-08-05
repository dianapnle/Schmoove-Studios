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
                        <div className={`studioname`}>{studio.name}</div>
                        {studio.avgStarRating === 0.0
                ? <div className="rating"><span className="star">★</span> New</div>
                : <div className={`rating`}><span className="star">★</span> {studio.avgStarRating?.toFixed(1)}</div>
                }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export default StudioTile;
