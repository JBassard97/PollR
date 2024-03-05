import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

//Page imports for routing
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/home.jsx';
import Login from './pages/Login/login.jsx';
import UserSettings from './pages/UserSettings/userSettings.jsx';
import UserProfile from './pages/UserProfile/userProfile.jsx';
import CreatePoll from './pages/CreatePoll/createPoll.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/userSettings',
        element: <UserSettings />,
      },
      {
        path: '/userProfile',
        element: <UserProfile />,
      },
      {
        path: '/createPoll',
        element: <CreatePoll />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
