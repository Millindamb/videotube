import React from 'react'
import './app.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout.jsx'
import Register from './pages/Register.jsx'
import { Watch,Channel,Subscriptions,LikedVideos,Tweets,Settings } from './components/index.js'
import MainLayout from './layouts/MainLayout'
import AnotherLayout from './layouts/AnotherLayout'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

const App = () => {
  const router=createBrowserRouter([{
    path:'/',
    element:<MainLayout/>,
    children:[
      {path:"/",element:<Home/>},
      {path:"/watch/:videoId",element:<Watch/>},
      {path:"/channel/:username",element:<Channel/>},
      {path:"/subscriptions",element:<Subscriptions/>},
      {path:"/liked",element:<LikedVideos/>},
      {path:"/tweets",element:<Tweets/>},
      {path:"/settings",element:<Settings/>},
      ]
    },
    {
      path:'/',
      element:<AnotherLayout/>,
      children:[
        {path:'/users/login',element:<Login/>},
        {path:'users/logout',element:<Logout/>},
        {path:'users/register',element:<Register/>}
      ]
    },
  ])
  return <RouterProvider router={router}/>
}

export default App
