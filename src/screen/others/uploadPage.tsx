import { useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";

const UploadPage = () => {
  const api_url = import.meta.env.VITE_API_KEY;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [videoLink, setVideoLink] = useState("");

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !videoFile || !thumbnail) {
      alert("Please fill all fields and select video + thumbnail.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      const res = await axios.post(`${api_url}videos/`, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        },
      });

      if (res.data?.data?._id) {
        setSuccessMsg("Video uploaded successfully!");
        setVideoLink(`/videos/${res.data.data._id}`);
      }
    } catch (error) {
      console.error(error);
      alert("Video upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="upload-container" style={styles.container}>
        <h2 style={styles.heading}>Upload Your Video</h2>
        <form onSubmit={handleUpload} style={styles.form}>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />

          <label style={styles.label}>Choose Video:</label>
          <input type="file" accept="video/*" onChange={handleVideoChange} />
          {videoPreview && (
            <video
              src={videoPreview}
              controls
              style={{ marginTop: "10px", maxWidth: "400px", borderRadius: "8px" }}
            />
          )}

          <label style={styles.label}>Choose Thumbnail:</label>
          <input type="file" accept="image/*" onChange={handleThumbnailChange} />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              style={{ marginTop: "10px", width: "200px", borderRadius: "8px" }}
            />
          )}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </form>

        {successMsg && (
          <div style={styles.successBox}>
            <p>{successMsg}</p>
            <a href={videoLink} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    maxWidth: "700px",
    margin: "auto",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  heading: { marginBottom: "20px", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    minHeight: "80px",
  },
  label: { fontWeight: "bold" },
  button: {
    backgroundColor: "#ff0000",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  successBox: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid green",
    borderRadius: "8px",
    background: "#e6ffe6",
  },
};

export default UploadPage;