import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { useState } from "react";

const MainLayout = () => {
  const [showSidebar,setShowSidebar]=useState(true);
  return (
    <div style={{display:"flex"}}>
        {showSidebar && <Sidebar/>}
        <div style={{flex: 1}}>
            <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout
