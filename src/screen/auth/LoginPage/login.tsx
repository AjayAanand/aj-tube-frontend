import axios from "axios";
import { useState } from "react";
import "./loginPage.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        { email, password }
      );
      const { data } = response.data;
      console.log("Login successful:", data);
      if (data && data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        document.cookie = `token=${data.accessToken}; path=/`;
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="login-container">
      <div className="login-box">
        <h1 className="app-title">Aj-Tube</h1>
        <h2 className="login-title">Login</h2>

        <form>
          <div className="input-group">
            <label>Email</label>
             <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
           <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isLoading ? <div className="loading-spinner">Loading...</div> : (
            <button type="submit" className="login-btn" onClick={handleSubmit}>Login</button>
          )}
        </form>

        <p className="extra-links">
          <a href="/forgot-password">Forgot Password?</a>
        </p>

        <p className="register-link">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
