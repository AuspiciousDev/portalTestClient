import React, { useState, useEffect } from "react";
import { Lock, Person } from "@mui/icons-material";
import { Container, TextField, Button } from "@mui/material";
import "../App.css";
import background from "../images/bluevector.jpg";

const Register = () => {
  const initValues = { password: "", confPassword: "" };
  const [formValues, setFormValues] = useState(initValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    //console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.confPassword) {
      errors.confPassword = "confirm Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const passwordMatch = false;
  //   const register = () => {
  //     if (password == confPassword) {
  //       alert("password match");
  //       passwordMatch = true;
  //     }
  //     if (password !== confPassword) {
  //       alert("wrong password");
  //       passwordMatch = false;
  //     }
  //   };

  return (
    <div>
      <img className="login-background" src={background} alt="" />
      <Container className="container-parent">
        {/* <pre>{JSON.stringify(formValues, undefined, 2)}</pre> */}

        <div className="container-child">
          <p>Register Account</p>

          <form className="register-form">
            <TextField
              type="text"
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              className="register-input"
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              className="register-input"
            />
            <TextField
              id="outlined-basic"
              label="Student Number"
              variant="outlined"
              className="register-input"
            />
            <TextField
              id="outlined-basic"
              label="School Email"
              variant="outlined"
              className="register-input"
            />
            <TextField
              type="text"
              id="outlined-basic"
              label="Password"
              name="password"
              variant="outlined"
              className="register-input"
              autoComplete="off"
              value={formValues.password}
              onChange={handleChange}
            />
            <TextField
              type="text"
              name="confPassword"
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              className="register-input"
              autoComplete="off"
              value={formValues.confPassword}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              className="register-button"
            >
              Register
            </Button>
          </form>
          <div className="container-footer">
            <p>Don't have account yet?</p>
            <a href="">
              <span>Login</span>
            </a>
            {/* <Link to="/register">Register here</Link> */}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
