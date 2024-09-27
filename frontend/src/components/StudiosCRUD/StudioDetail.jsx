import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getStudioDetail } from '../../store/studios'
import { thunkGetAllStudioInstructors } from '../../store/instructors'
import ClassList from '../ClassesCRUD/ClassList'
import ReviewList from '../Review/ReviewList'
import OpenModalAddInstructorButton from '../InstructorsCRUD/EditInstructorModal'
import AddInstructorModal from '../InstructorsCRUD/AddInstructor'
import './StudioDetail.css'
import OpenModalEditInstructorButton from '../InstructorsCRUD/OpenModalEditButton'
import EditProfilePic from '../InstructorsCRUD/EditProfilePic'
import DeleteInstructorModal from '../InstructorsCRUD/DeleteInstructorModal'
import OpenModalDeleteButton from '../InstructorsCRUD/OpenModalDeleteInstructor'

function StudioDetail({ showEdit }) {
  const { studioId } = useParams()
  const id = Number(studioId)
  const studio = useSelector((state) => state.studios[id])
  const instructors = useSelector((state) => state.instructors)
  const sessionUser = useSelector((state) => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStudioDetail(id))
      .then(dispatch(thunkGetAllStudioInstructors(id)))
      .then(() => {
        setIsLoaded(true)
      })
  }, [id, dispatch, isLoaded])

  return (
    <>
      <div className={`overallContainer`}>
        <div className='contentBody'>
          <div className='title'>
            <div className={`imgContainer`}>
              <img className={`logo`} src={studio?.logo} />
            </div>

            <div className={`pricing-stars`}>
              <h2>{studio?.name}</h2>
              <div className='stats'>
                {studio?.avgStarRating === null ? (
                  <div>
                    <span className='star'>★</span> New
                  </div>
                ) : (
                  <span>
                    <span className='star'>★</span>{' '}
                    {studio?.avgStarRating?.toFixed(1)} ·{' '}
                    {studio?.numReviews === 1 ? (
                      <span>{studio?.numReviews} review</span>
                    ) : (
                      <span> {studio?.numReviews} reviews</span>
                    )}{' '}
                  </span>
                )}
              </div>
            </div>
            <br></br>
          </div>
          <div className={`studios-area`}>
            <br></br>
            <div className={`imgContainer`}>
              <img className='pictureDetail' src={studio?.pic} />
            </div>
            <div className='description'>
              <h3>{studio?.description}</h3>
            </div>
            <br></br>
            <div className={`studio-details`}>
              <div className={`body`}>
                <div className={`paragraph`}></div>
              </div>
            </div>
          </div>
          <div className='instructorOverall'>
            <h2>Our Instructors:</h2>
            {showEdit && sessionUser?.id === studio?.ownerId && (
              <div className={`add`}>
                <OpenModalAddInstructorButton
                  modalComponent={<AddInstructorModal studioId={studio?.id} />}
                />
              </div>
            )}
          </div>
          <div className={`instructors-area`}>
            <div className={`instructors`}>
              {Object.values(instructors).length === 0 ? (
                <div className={`none`}>No instructors yet!</div>
              ) : (
                Object.values(instructors).map((instructor) => (
                  <span key={`${instructor.id}`}>
                    <div className={'individual-instructor-area'}>
                      <div className='individualinstructor'>
                        <img
                          className={`profilePic`}
                          src={`${instructor.profilePic}`}
                        />
                      </div>
                      <div className='firstName'>{instructor?.firstName}</div>
                      {showEdit && sessionUser?.id === studio?.ownerId && (
                        <div className={'pencil-delete'}>
                          <OpenModalEditInstructorButton
                            modalComponent={
                              <EditProfilePic instructorId={instructor.id} />
                            }
                          />
                          <OpenModalDeleteButton
                            modalComponent={
                              <DeleteInstructorModal
                                instructorId={instructor.id}
                              />
                            }
                          />
                        </div>
                      )}
                    </div>
                  </span>
                ))
              )}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className='tab-area'>
              <div className='tab-bar'>
                <span
                  onClick={() => setActiveTab(0)}
                  className={
                    activeTab === 0
                      ? 'tab-both active-tab-both'
                      : 'tab-both inactive-tab-both'
                  }
                >
                  {' '}
                  Classes{' '}
                </span>
                <span
                  onClick={() => setActiveTab(1)}
                  className={
                    activeTab === 1
                      ? 'tab-both active-tab-both'
                      : 'tab-both inactive-tab-both'
                  }
                >
                  {' '}
                  Reviews{' '}
                </span>
              </div>
              <div className='tab-main'>
                {activeTab === 0 && (
                  <div>
                    <ClassList studioId={id} showEdit={showEdit} />
                  </div>
                )}
                {activeTab === 1 && (
                  <div>
                    <ReviewList studioId={id} />
                  </div>
                )}
              </div>
            </div>
            {/* {activeTab === 0 ? <div><ClassList studioId={id} showEdit={showEdit} /></div> : <div><ReviewList studioId={id} /></div>}
            <br></br> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default StudioDetail
