import React, { useEffect, useState, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Box, Container } from "@mui/material";
import { Lock, Person } from "@mui/icons-material";
import background from "../images/bluevector.jpg";
import "../App.css";

import axios from "axios";
const LOGIN_URL = "/auth";
const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);
  useEffect(() => {
    const inputs = document.querySelectorAll(".input");
    function addcl() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }

    function remcl() {
      let parent = this.parentNode.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", addcl);
      input.addEventListener("blur", remcl);
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user: username, pwd: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ username, password, roles, accessToken });
      setUsername("");
      setPassword("");
      console.log(from);
      console.log(response);
      console.log(roles);
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        console.log("no server response");
      } else if (error.response?.status === 400) {
        // console.log("Missing Username/Password");
        console.log(error.response.data.message);
        // setErrMsg(error.response.data.message);
      } else if (error.response?.status === 401) {
        // console.log("Unauthorized");
        console.log(error.response.data.message);
        // setErrMsg(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div className="mainpage-container">
      <Container className="container-parent">
        <div className="container-child">
          <p>Login to you Account</p>

          <form onSubmit={handleSubmit}>
            <div className="input-div username">
              <div className="i">
                <i>
                  <Person />
                </i>
              </div>
              <div className="div">
                <h5>Username</h5>
                <input
                  type="text"
                  className="input"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input-div password">
              <div className="i">
                <i>
                  <Lock />
                </i>
              </div>
              <div className="div">
                <h5>Password</h5>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {/* <FontAwesomeIcon icon="eye" /> */}
              </div>
            </div>

            <div className="remember-me">
              <input type="checkbox" value="lsRememberMe" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
              <a href="">Forgot Password?</a>
            </div>
            <input className="login-btn" type="submit" />
            <div className="container-footer">
              <p>Don't have account yet?</p>
              <Link to="/register">
                <span>Register</span>
              </Link>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
