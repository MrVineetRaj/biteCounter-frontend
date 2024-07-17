import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "../index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import SignUp, { createUser } from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import UserProfile from './components/UserProfile.jsx'
import Home from './components/Home.jsx'
import SaveDiet from './components/SaveDiet.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/home", element: <Home /> },
      { path: "/home/user-profile", element: <UserProfile /> },
      { path: "/home/save-diet", element: <SaveDiet /> },
    ],
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
