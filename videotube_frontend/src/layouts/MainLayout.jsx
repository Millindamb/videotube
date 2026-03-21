import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { useState, useContext, useEffect } from "react";
import { isAuthContext } from "../context/context";

const MainLayout = () => {
  const values=useContext(isAuthContext)
  const [showSidebar,setShowSidebar]=useState(true);

  useEffect(()=>{
    setShowSidebar(values.isLoggedIn) 
  },[])
  return (
    <div style={{display:"flex"}}>
        {!values.isLoggedIn && showSidebar && <Sidebar/>}
        <div style={{flex: 1}}>
            <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout
