import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const MainLayout = () => {
  return (
    <div style={{display:"flex"}}>
        <Sidebar/>
        <div style={{flex: 1}}>
            <Navbar/>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout
