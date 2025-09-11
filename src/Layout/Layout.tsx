import { useEffect, useState, type ReactNode } from "react";
import "./Layout.css";
import axios from "axios";
import LogOutIcon from "../assets/logout.png";

type LayoutProps = {
  children: ReactNode;
  sideBar?: boolean;
};

type UserData = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  avatar?: string;
};

const Layout = ({ children, sideBar }: LayoutProps) => {
  const api_url = import.meta.env.VITE_API_KEY;
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${api_url}users/current-user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        const { data } = response.data;
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleUpload = () => {
    window.location.href = "/upload";
  }

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      {/* Navbar */}
      <div className="navbar">
        {/* Left: Logo */}
        <button  style={{color: darkMode ? "white" : "black", fontSize:"20px", fontWeight:"bold", backgroundColor:"transparent", border:"none"}} onClick={() => window.location.href = "/"}>
          ▶ Aj-Tube
        </button>
        {/* Center: Search Bar */}
        <div className="nav-center">
          <input type="text" className="search-input" placeholder="Search" />
          <button className="search-btn">🔍</button>
        </div>

        {/* Right: Profile + Controls */}
        <div className="nav-right">
          <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
            {darkMode ? "🌙" : "☀️"}
          </button>
          <button className="icon-button"
           style={{ background: darkMode ? "#474343ff" : "#d8d8d8ff", color: darkMode ? "#fff" : "#000" }} 
           onClick={handleUpload}
           >Upload Video</button>
          <button className="icon-button">🔔</button>
          <img
            src={userData?.avatar || "https://via.placeholder.com/40"}
            alt="Profile"
            className="profile-pic"
            onClick={() => {
              if (userData) {
                window.location.href = `/profile/${userData.id}`;
              }
            }}
          />
        </div>
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        {!sideBar && (
            <div className="sidebar">
          <ul>
            <li onClick={() => window.location.href = "/"}>🏠 Home</li>
            <li>🔥 Trending</li>
            <li>📺 Subscriptions</li>
            <li>📚 Library</li>
            <li>⏰ Watch Later</li>
            <li>👍 Liked Videos</li>
            <li>🎬 Your Videos</li>
            <li>⚙️ Settings</li>
            <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                <img src={LogOutIcon} alt="Logout" style={{ width: 20, verticalAlign: "middle", marginRight: 8 }} />
                <span style={{ verticalAlign: "middle" }}>Logout</span>
            </li>
          </ul>
        </div>
        )}

        {/* Scrollable Content */}
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
