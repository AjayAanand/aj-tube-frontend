import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../Layout/Layout";
import "./profile.css";

const Profile = () => {
  const api_url = import.meta.env.VITE_API_KEY;
  const { id } = useParams();
  const [userData, setUserData] = useState<any | null>(null);
  const [userVideos, setUserVideos] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("videos"); // default tab

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

    const fetchVideoByUser = async () => {
        try {
            const response = await axios.get(`${api_url}videos/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            const { data } = response.data;
            setUserVideos(data);
            console.log("User videos:", data);
        } catch (error) {
            console.error("Error fetching user videos:", error);
        }

    };


    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
      }
    };

    checkAuth();
    fetchUserData();
    fetchVideoByUser();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "videos":
        return (
             <div className="tab-content">
      <h3>Uploaded Videos</h3>
      <div className="video-grids">
        {userVideos.map((video) => (
          <div className="video-cards" key={video.id} onClick={() => window.location.href = `/videos/${video._id}`}>
            <img src={video.thumbnail} alt={video.title} />
            <h4>{video.title}</h4>
          </div>
        ))}
        {userVideos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : null}
      </div>
    </div>
        );
      case "tweets":
        return (
          <div className="tab-content">
            <h3>Tweets</h3>
            <p>Tweets from {userData?.fullName} will appear here.</p>
          </div>
        );
      case "playlists":
        return (
          <div className="tab-content">
            <h3>Playlists</h3>
            <p>{userData?.fullName}’s playlists will be shown here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="profile-container">
        <div className="cover-photo">
          <img
            src={userData?.coverImage || "https://via.placeholder.com/1200x300"}
            alt="Cover"
          />
          <button className="change-btn">Change Cover</button>
        </div>

        <div className="profile-details">
          <div className="profile-avatar">
            <img
              src={userData?.avatar || "https://via.placeholder.com/150"}
              alt="Profile"
            />
            <button className="change-btn small-btn">Change</button>
          </div>

          <div className="profile-info">
            <h2>{userData?.fullName || "Unknown User"}</h2>
            <p>@{userData?.username}</p>
            <p>{userData?.email}</p>
            <p className="followers">
              Followers: {userData?.followersCount || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === "videos" ? "active" : ""}`}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
        <button
          className={`tab-btn ${activeTab === "tweets" ? "active" : ""}`}
          onClick={() => setActiveTab("tweets")}
        >
          Tweets
        </button>
        <button
          className={`tab-btn ${activeTab === "playlists" ? "active" : ""}`}
          onClick={() => setActiveTab("playlists")}
        >
          Playlists
        </button>
      </div>

      {/* Dynamic Tab Content */}
      {renderContent()}
    </Layout>
  );
};

export default Profile;
