import React,{ useState,useContext,useEffect,useRef } from "react";
import{ isAuthContext } from "../context/context";
import{ Link,useNavigate } from "react-router-dom";
import{ logoutUser } from "../api/logout";
import "./Navbar.css";

const Navbar=({ showSidebar,setShowSidebar })=>{
  const values=useContext(isAuthContext);
  const navigate=useNavigate();
  const user=JSON.parse(localStorage.getItem("user"));

  const [searchQuery,setSearchQuery]=useState("");
  const [darkMode,setDarkMode]=useState(!document.body.classList.contains("light-mode"));
  const [dropdownOpen,setDropdownOpen]=useState(false);

  const logout=async()=>{
    try{
      const response=await logoutUser();
      if(response?.data?.success){
        values.setLoggedIn(false);
        setDropdownOpen(false);
        navigate("/");
      }
    } catch(err){
      console.error("Logout failed",err);
    }
  };

  const handleSearch=(e)=>{
    e.preventDefault();
    if(searchQuery.trim()){
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleTheme=()=>{
    document.body.classList.toggle("light-mode");
    setDarkMode(!document.body.classList.contains("light-mode"));
  };

  return(
    <header className="navbar">
      <div className="nav-left">
        <button onClick={()=>setShowSidebar(!showSidebar)} className="menu-btn" >
          <i className="fa-solid fa-bars"></i>
        </button>

        <Link to="/" className="logo">
          <div className="logo-box">
            <i className="fa-solid fa-video"></i>
          </div>
          <span className="logo-text">videoTube</span>
        </Link>
      </div>

      <form className="nav-search" onSubmit={handleSearch}>
        <input type="text" placeholder="Type anything..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      <div className="nav-right">
       {values.isLoggedIn &&(
          <button onClick={()=>navigate("/dashboard#upload-section")} className="icon-btn" title="Upload">
            <i className="fa-solid fa-upload"></i>
          </button>
        )}

        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
         {darkMode ?(<i className="fa-solid fa-sun"></i>) 
         :(<i className="fa-solid fa-moon"></i>)}
        </button>

       {values.isLoggedIn &&(
          <div className="notification">
            <p>0</p>
            <button className="icon-btn" title="Notifications">
              <i className="fa-solid fa-bell"></i>
            </button>
          </div>          
        )}

       {values.isLoggedIn &&(
          <div onMouseEnter={()=>setDropdownOpen(true)} onMouseLeave={()=>{setDropdownOpen(false)}}>
            <div className="avatar">
              <img src={user.avatar} alt="" />
            </div>
           {dropdownOpen &&(
              <div className="dropdown">
                <div onClick={()=>{navigate("/profile");setDropdownOpen(false);}}>
                  Profile
                </div>
                <div onClick={()=>{navigate("/dashboard");setDropdownOpen(false);}}>
                  Dashboard
                </div>
                <div onClick={()=>{navigate("/settings"); setDropdownOpen(false);}}>
                  Settings
                </div>
                <hr />
                <div onClick={logout}>Logout</div>
              </div>
            )}
          </div>
        )}
        
       {!values.isLoggedIn &&(
          <button className="signin-btn" onClick={()=>navigate("/users/login")}>Sign In </button>)}
      </div>
    </header>
  );
};

export default Navbar;