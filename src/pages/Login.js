import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../envConst";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const apiPath = API_BASE_URL + '/analytics/login'

    const formBody = new URLSearchParams();
    formBody.append('username', username);
    formBody.append('password', password);

    try {
      // Replace with your real login API endpoint
      const response = await axios.post(apiPath, formBody);

      // Store response in localStorage
      localStorage.setItem("token", JSON.stringify(response.data?.access_token));

      // Redirect or show success
      // alert("Login successful!");
      navigate('/analytics')

    } catch (error) {
      setErrorMsg("Invalid credentials or API error.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-4">Login</h3>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
