// src/pages/WatchVideoPage/WatchVideoPage.tsx

import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import "./watchVideopage.css";

type VideoType = {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  duration: number;
  views: number;
  createdAt: string;
  likes: number;
  dislikes: number;
  owner: {
    _id: string;
    username: string;
    fullName: string;
    avatar: string;
    subscribersCount: number;
  };
};

type CommentType = {
  _id: string;
  content: string;
  createdAt: string;
  user: {
    username: string;
    fullName: string;
    avatar: string;
  };
};

const WatchVideoPage = () => {
  const api_url = import.meta.env.VITE_API_KEY;
  const videoId = window.location.pathname.replace("/videos/", "");
  const [video, setVideo] = useState<VideoType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [recommended, setRecommended] = useState<VideoType[]>([]);
  const [newComment, setNewComment] = useState("");

  // ✅ Fetch Video by ID
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `${api_url}videos/${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
            },
          }
        );
        setVideo(response.data.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${api_url}comments/${videoId}/comments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchRecommended = async () => {
      try {
        const response = await axios.get(
          `${api_url}videos/recommended/${videoId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRecommended(response.data.data);
      } catch (error) {
        console.error("Error fetching recommended videos:", error);
      }
    };

    fetchVideo();
    fetchComments();
    fetchRecommended();
  }, [videoId]);

  // ✅ Handle New Comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(
        `${api_url}videos/${videoId}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setComments([response.data.data, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <Layout sideBar={true}>
      <div className="watch-container">
        {/* LEFT SECTION */}
        <div className="watch-left">
          {video ? (
            <>
              {/* Video Player */}
              <video
                className="video-player"
                src={video.videoFile}
                controls
                autoPlay
              />

              {/* Video Details */}
              <h2>{video.title}</h2>
              <p className="video-stats">
                {video.views} views • {new Date(video.createdAt).toDateString()}
              </p>

              {/* Like / Dislike / Subscribe */}
              <div className="video-actions">
                <div className="like-dislike">
                  <button>👍 {video.likes}</button>
                  <button>👎 {video.dislikes}</button>
                </div>
                <div className="subscribe-btn">
                  <button>Subscribe</button>
                </div>
              </div>

              {/* Channel Info */}
              <div className="channel-info">
                <img
                  src={video.owner.avatar}
                  alt="channel avatar"
                  className="channel-avatar"
                />
                <div>
                  <h4>{video.owner.fullName}</h4>
                  <p>{video.owner.subscribersCount} subscribers</p>
                </div>
              </div>

              {/* Description */}
              <div className="video-description">
                <p>{video.description}</p>
              </div>

              {/* Comments Section */}
              <div className="comments-section">
                <h3>{comments.length} Comments</h3>
                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button type="submit">Comment</button>
                </form>
                {comments.map((c) => (
                  <div key={c._id} className="comment">
                    <img src={c.user.avatar} alt="user avatar" />
                    <div>
                      <h5>{c.user.fullName}</h5>
                      <p>{c.content}</p>
                      <small>
                        {new Date(c.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* RIGHT SECTION (Recommended Videos) */}
        <div className="watch-right">
          <h3>Recommended</h3>
          {recommended.map((vid) => (
            <div key={vid._id} className="recommended-video">
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="recommended-thumbnail"
              />
              <div>
                <h5>{vid.title}</h5>
                <p>{vid.owner.fullName}</p>
                <small>{vid.views} views</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default WatchVideoPage;
