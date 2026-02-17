import React, { useState,useContext } from "react";
import { isAuthContext } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const values=useContext(isAuthContext);
  const logout = () => {
    localStorage.removeItem("accessToken")
    values.setLoggedIn(false)
  }
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleTheme=()=>{
    setDarkMode(!darkMode);
    document.body.classList.toggle("light-mode");
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <button className="menu-btn"><i className="fa-solid fa-bars"></i></button>
        

        <Link to="/" className="logo">
          <div className="logo-box"><i className="fa-solid fa-video"></i></div>
          <span className="logo-text">videoTube</span>
        </Link>
      </div>

      <form className="nav-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="type Anything..."
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
        />
        <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
      </form>

      <div className="nav-right">
        {values.isLoggedIn && <button className="icon-btn" title="Upload"><i className="fa-solid fa-upload"></i></button>}

        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {darkMode ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
        </button>

        {values.isLoggedIn && <button className="icon-btn" title="Notifications"><i className="fa-solid fa-bell"></i></button>}

        {values.isLoggedIn && <div className="profile">
          <button
            className="avatar"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            U
          </button>

          {dropdownOpen && (
            <div className="dropdown">
              <div onClick={() => navigate("/profile")}>Profile</div>
              <div onClick={() => navigate("/dashboard")}>Dashboard</div>
              <div onClick={() => navigate("/settings")}>Settings</div>
              <hr/>
              <div onClick={()=>{logout()}}>Logout</div>
            </div>
          )}
        </div>}

        {!values.isLoggedIn && <button className="signin-btn" onClick={()=>navigate("/users/login")}>  Sign In</button>}
      </div>
    </header>
  );
};

export default Navbar;
