import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import './Navigation.css'
import logo from '../../../images/logo.png'
import CreateStudioModal from '../StudiosCRUD/CreateStudio'
import OpenModalMenuItem from './OpenModalMenuItem'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user)

  return (
    <>
      <div className={`overall-block`}>
        <div className={`home-block`}>
          <NavLink to='/' className={`home-button`}>
            <img src={logo} style={{ height: '75px' }} />
          </NavLink>
        </div>
        <div className={`profile-area`}>
          {isLoaded && sessionUser && (
            <div className={`createstudiolink`}>
              <OpenModalMenuItem
                itemText='Create a New Studio'
                modalComponent={<CreateStudioModal />}
              />
            </div>
          )}
          {isLoaded && (
            <div className={`profile-block`}>
              <ProfileButton className={`profilebutton`} user={sessionUser} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navigation
