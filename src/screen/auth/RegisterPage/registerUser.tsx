import { useState } from "react";
import "./registerPage.css";
import axios from "axios";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null as File | null,
    coverImage: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [registerComplete, setRegisterComplete] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", form.fullName);
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      if (form.avatar) formData.append("avatar", form.avatar);
      if (form.coverImage) formData.append("coverImage", form.coverImage);

      const response = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setIsLoading(false);
      setRegisterComplete(true);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Left Side Info */}
        <div className="info-side">
          <h3>Already Have an Account?</h3>
          <p>Login and continue your journey with us.</p>
          <button
            className="login-btn"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        </div>
        {registerComplete ? (<>
        <div className="thank-you-message">
        <h1>Thank you {form.fullName} for registering!</h1>
        <p>You can now log in and start using our platform.</p>
      </div>
      </>):<div className="register-form">
          <h2>Create Account</h2>
          <form onSubmit={handleRegister} className="form-fields">
            {/* Avatar Upload */}
            <div className="file-upload">
              <label>Profile Picture</label>
              {form.avatar ? (
                <>
                  <p onClick={() => setForm({ ...form, avatar: null })} style={{ cursor: "pointer", color: "white", marginBottom: -8, marginLeft:220,  backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: 5, padding: "2px 5px", width: "fit-content" }}>X</p>
                <img
                  src={URL.createObjectURL(form.avatar)}
                  alt="Avatar Preview"
                  className="preview-img"
                  width={100}
                  height={100}
                />
                </>
              ):( <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
              />)}
            </div>

            {/* Cover Upload */}
            <div className="file-upload">
              <label>Cover Image</label>
              {form.coverImage ? (
                <>
                  <p onClick={() => setForm({ ...form, coverImage: null })} style={{ cursor: "pointer", color: "white", marginBottom: -8, marginLeft:220,  backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: 5, padding: "2px 5px", width: "fit-content" }}>X</p>
                <img
                  src={URL.createObjectURL(form.coverImage)}
                  alt="Cover Preview"
                  className="preview-img"
                  width={380}
                  height={130}
                />
                </>
              ):(   
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleChange}
              />
              )}
            </div>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="register-btn" disabled={isLoading}>
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
        </div>}
      </div>
    </div>
  );
}