import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
        <button className="menu-btn"><i class="fa-solid fa-bars"></i></button>
        

        <Link to="/" className="logo">
          <div className="logo-box"><i class="fa-solid fa-video"></i></div>
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
        <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
      </form>

      <div className="nav-right">
        <button className="icon-btn" title="Upload"><i class="fa-solid fa-upload"></i></button>

        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {darkMode ? <i class="fa-solid fa-sun"></i> : <i class="fa-solid fa-moon"></i>}
        </button>

        <button className="icon-btn" title="Notifications"><i class="fa-solid fa-bell"></i></button>

        <div className="profile">
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
              <div>Logout</div>
            </div>
          )}
        </div>

        <button className="signin-btn"onClick={()=>navigate("/login")}>  Sign In</button>
      </div>
    </header>
  );
};

export default Navbar;
