import React, { useEffect } from "react";
import "../App.css";
import { Container } from "@mui/material";

import { Lock, Person } from "@mui/icons-material";
import background from "../images/bluevector.jpg";

const Login = () => {
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
  return (
    <div>
      <img className="login-background" src={background} alt="" />
      <Container className="container-parent">
        <div className="container-child">
          <p>Login to you Account</p>
          <form>
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
                  // onChange={(e) => {
                  //   setStudNum(e.target.value);
                  // }}
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
                  // onChange={(e) => {
                  //   setPassword(e.target.value);
                  // }}
                />
                {/* <FontAwesomeIcon icon="eye" /> */}
              </div>
            </div>

            <div className="remember-me">
              <input type="checkbox" value="lsRememberMe" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
              <a href="">Forgot Password?</a>
              {/* <Link to="/forgotpassword">Forgot password?</Link> */}
            </div>
            <input className="login-btn" type="submit" value="Login" />
            <div className="container-footer">
              <p>Don't have account yet?</p>
              <a href="">
                <span>Register</span>
              </a>
              {/* <Link to="/register">Register here</Link> */}
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
