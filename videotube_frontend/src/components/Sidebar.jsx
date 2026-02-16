import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const publicLinks = [
  { title: "Home", url: "/", icon: <i class="fa-solid fa-house"></i> },
];

const authLinks = [
  { title: "Subscriptions", url: "/subscriptions", icon: "▶" },
  { title: "Liked Videos", url: "/liked", icon: "👍" },
  { title: "Playlists", url: "/dashboard/playlists", icon: "📂" },
  { title: "Tweets", url: "/tweets", icon: "💬" },
  { title: "Dashboard", url: "/dashboard", icon: "📊" },
];

const Sidebar = ({ isAuthenticated }) => {
  const links = isAuthenticated
    ? [...publicLinks, ...authLinks]
    : publicLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        {links.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.url === "/"}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-text">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
