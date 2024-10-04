/* eslint-disable no-unused-vars */
import "../styles/home.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Main() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Function to log in
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000", credentials);
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/all");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <div className="home-login flex-column-center">
        <h1>
          Thoughts, stories and <br /> ideas from Narrative
        </h1>
        <p>*Login to leave comments and post your stories</p>
        <div>
          {error && <div>{error}</div>}
          <form
            className="login-form flex-column-center"
            onSubmit={handleSubmit}
          >
            <input
              placeholder="username"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="login-input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              className="login-input"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="header-button login-btn">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Main;
