// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginFormModal from './components/LoginFormModal/LoginFormModal';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import StudiosBrowser from './components/AllStudiosBrowser/AllStudiosBrowser';
import StudioDetail from './components/StudiosCRUD/StudioDetail';
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
        path: "studios/current",
        element: <ManageStudiosBrowser />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
