// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginFormModal from './components/LoginFormModal/LoginFormModal';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import StudiosBrowser from './components/AllStudiosBrowser/AllStudiosBrowser';
import StudioDetail from './components/StudiosCRUD/StudioDetail';
import ClassDetail from './components/ClassesCRUD/ClassDetail';
import ManageStudiosBrowser from './components/StudiosCRUD/ManageStudiosBrowser';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

function OtherURLS () {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/')

  }, [navigate])
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <StudiosBrowser />
      },
      {
        path: '/login',
        element: <LoginFormModal />
      },
      {
        path: "studios/:studioId",
        element: <StudioDetail />
      },
      {
        path: "classes/:classId",
        element: <ClassDetail />
      },
      {
        path: "studios/current",
        element: <ManageStudiosBrowser />
      },
      {
        path: "*",
        element: <OtherURLS />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
