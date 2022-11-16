import React, { useEffect, useState, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  Container,
  TextField,
  Button,
  Box,
  InputAdornment,
  Typography,
  IconButton,
} from "@mui/material";
import {
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  EmailOutlined,
} from "@mui/icons-material";
import background from "../images/bluevector.jpg";
import "../App.css";

import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import axios from "./../api/axios";
const LOGIN_URL = "/auth";
const ResetPassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };
  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);
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
      const loginHistory = await axios.post(
        "api/loginhistories/register",
        JSON.stringify({ username }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(loginHistory?.data);
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ username, password, roles, accessToken });
      setUsername("");
      setPassword("");
      console.log(username);
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
        <Box
          className="container-child"
          sx={{ backgroundColor: colors.black[900] }}
        >
          <Typography>Forgot Password</Typography>

          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                required
                fullWidth
                type="email"
                label="Email"
                name="password"
                variant="outlined"
                className="register-input"
                autoComplete="off"
                value={password}
                // onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <input className="login-btn" type="submit" />
            <div className="container-footer">
              <Typography>Don't have account yet?</Typography>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </div>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default ResetPassword;
