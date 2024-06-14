import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import RouterProvider from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Login from './Components/Login/Login.jsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },{
    path:"/login",
    element:<Login/>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />
</>
)
