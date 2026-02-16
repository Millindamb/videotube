import React from 'react'
import './app.css'
import Home from './pages/Home'
import Login from './pages/Login'
import { Watch,Channel,Subscriptions,LikedVideos,Tweets,Settings } from './components/index.js'
import MainLayout from './layouts/MainLayout'
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
    path:'/login',
    element:<Login/>
  }])
  return <RouterProvider router={router}/>
}

export default App
