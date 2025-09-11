import { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import Layout from "../../Layout/Layout";

const Home = () => {
  const api_url = import.meta.env.VITE_API_KEY;
  const [AllVideoData, setAllVideoData] = useState<any[]>([]);
  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await axios.get(`${api_url}videos/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        setAllVideoData(response.data.data);
      } catch (error) {
        console.error("Error fetching all videos:", error);
      }
    };

    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
      }
    };
    
    checkAuth();

    getAllVideos();
  }, []);

  return (
    <Layout>
      <div className="video-grid">
        {AllVideoData?.map((video: any) => (
          <div className="video-card" key={video._id} onClick={() => window.location.href = `/videos/${video._id}`}>
            <div className="thumbnail">
              <img src={video.thumbnail} alt="Video Thumbnail" />
            </div>
            <div className="video-info">
              <img
                className="channel-avatar"
                src={video.owner?.avatar || "https://via.placeholder.com/40"}
                alt="Channel Avatar"
              />
              <div>
                <h4 className="video-title">{video.title}</h4>
                <p className="video-meta">
                  {video.owner?.fullName || "Unknown"} • {(video.duration.toFixed(2) / 60).toFixed(2)} mins
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;