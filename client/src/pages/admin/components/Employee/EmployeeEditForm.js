import React from "react";
import { useState, useEffect } from "react";
import { useEmployeesContext } from "../../../../hooks/useEmployeesContext";

import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import Popup from "reactjs-popup";
import { ContactEmergency, DriveFileRenameOutline } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import axios from "axios";
const EmployeeEditForm = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { employees, empDispatch } = useEmployeesContext();

  const [empID, setEmpID] = useState("");
  const [empType, setEmpType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffix, setSuffix] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [empIDError, setEmpIDError] = useState(false);
  const [empTypeError, setEmpTypeError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);

  const [validation, setValidation] = useState(true);

  const handleDate = (newValue) => {
    setDateOfBirth(newValue);
    setDateOfBirthError(false);
  };

  const setUserDetails = async () => {
    console.log({ data });
    if (data) {
      setEmpID(data.empID);
      setFirstName(data.firstName);
      setMiddleName(data.middleName);
      setLastName(data.lastName);
      setSuffix(data.suffix);
      setDateOfBirth(data.dateOfBirth);
      setGender(data.gender);
      setEmail(data.email);
    }
  };

  useEffect(() => {
    setUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employee = {
      empID,
      firstName,
      middleName,
      lastName,
      suffix,
      dateOfBirth,
      gender,
      email,
      mobile,
    };

    if (!empID) {
      setEmpIDError(true);
    } else {
      setEmpIDError(false);
    }
    if (!firstName) {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (!lastName) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
    if (!dateOfBirth) {
      setDateOfBirthError(true);
    } else {
      setDateOfBirthError(false);
    }
    if (!gender) {
      setGenderError(true);
    } else {
      setGenderError(false);
    }
    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (!mobile) {
      setMobileError(true);
    } else {
      setMobileError(false);
    }

    if (
      !empIDError &&
      !firstNameError &&
      !lastNameError &&
      !dateOfBirthError &&
      !genderError &&
      !emailError
    ) {
      const response = await axios.patch("/api/employees/update", {
        data: employee,
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });

      if (response.ok) {
        empDispatch({ type: "SET_EMPLOYEES", payload: null });

        const apiEmp = await axios.get("/api/employees", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (apiEmp?.status === 200) {
          const json2 = await apiEmp.data;
          empDispatch({ type: "SET_EMPLOYEES", payload: json2 });
          //   setEmployees(json);
        }
      }
    } else {
      console.log("MADAME ERROR");
    }
  };

  return (
    <Popup
      trigger={
        <IconButton sx={{ cursor: "pointer" }}>
          <DriveFileRenameOutline />
        </IconButton>
      }
      modal
      nested
    >
      {(close) => (
        <div
          className="modal"
          style={{
            backgroundColor: colors.primary[900],
            border: `solid 1px ${colors.black[200]}`,
          }}
        >
          <button className="close" onClick={close}>
            &times;
          </button>
          <div
            className="header"
            style={{ backgroundColor: colors.primary[800] }}
          >
            <Typography variant="h3" fontWeight="bold">
              DELETE RECORD
            </Typography>
          </div>
          <div className="content">
            <Box
              className="tryLang"
              display="flex"
              width="100%"
              flexDirection="column"
              justifyContent="center"
            >
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                {/* <Typography variant="h5">Registration</Typography> */}

                <Typography variant="h5" sx={{ margin: "25px 0 10px 0" }}>
                  General Information
                </Typography>
                <Box marginBottom="40px">
                  <Typography sx={{ margin: "10px 0" }} fontSize="14pt">
                    Name
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      width: "100%",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                      gap: "20px",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      label="First Name"
                      placeholder="Given Name"
                      error={firstNameError}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Middle Name"
                      placeholder="Optional"
                      value={middleName}
                      onChange={(e) => {
                        setMiddleName(e.target.value);
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Last Name"
                      placeholder="Last Name"
                      error={lastNameError}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Suffix"
                      placeholder="Sr./Jr./III"
                      value={suffix}
                      onChange={(e) => {
                        setSuffix(e.target.value);
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: "40px" }}>
                    <Box
                      sx={{
                        display: "grid",
                        width: "100%",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                        gap: "20px",
                        marginTop: "20px",
                      }}
                    >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                          label="Date of Birth"
                          inputFormat="MM/DD/YYYY"
                          error={dateOfBirthError}
                          value={dateOfBirth}
                          onChange={handleDate}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>

                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Gender
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gender}
                          error={genderError}
                          label="Gender"
                          onChange={(e) => {
                            setGender(e.target.value);
                          }}
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box marginTop="20px">
                      <Typography sx={{ margin: "10px 0" }} fontSize="14pt">
                        Address
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          width: "100%",
                          gridTemplateColumns: "1fr 1fr 1fr 1fr ",
                          gap: "20px",
                        }}
                      ></Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  width="100%"
                  flexDirection="column"
                  justifyContent="center"
                  marginBottom="40px"
                >
                  <Typography margin="0 0 25px 0" variant="h5">
                    Contact Information
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      width: "100%",
                      gridTemplateColumns: "1fr 1fr 1fr ",
                      gap: "20px",
                    }}
                  >
                    <TextField
                      variant="outlined"
                      label="Email"
                      value={email}
                      error={emailError}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Mobile Number"
                      error={mobileError}
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                    />
                    <TextField variant="outlined" label="Telephone Number" />
                  </Box>
                </Box>
                <Box marginBottom="40px">
                  <Typography variant="h5" sx={{ margin: "25px 0 10px 0" }}>
                    Employment Information
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      width: "100%",
                      gridTemplateColumns: "1fr 1fr 1fr ",
                      gap: "20px",
                    }}
                  >
                    <TextField
                      disabled
                      variant="outlined"
                      label="Employee ID"
                      error={empIDError}
                      value={empID}
                      onChange={(e) => {
                        setEmpID(e.target.value);
                      }}
                    />
                  </Box>
                </Box>
                <Box marginBottom="40px">
                  <Typography variant="h5" sx={{ margin: "25px 0 10px 0" }}>
                    Emergency Information
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="end"
                  height="70px"
                  sx={{ margin: "20px 0" }}
                >
                  <div className="actions">
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{
                        width: "200px",
                        height: "50px",
                        marginLeft: "20px",
                      }}
                    >
                      <Typography variant="h6">Confirm</Typography>
                    </Button>{" "}
                    <Button
                      type="button"
                      variant="contained"
                      sx={{
                        width: "200px",
                        height: "50px",
                        marginLeft: "20px",
                      }}
                      onClick={() => {
                        close();
                      }}
                    >
                      <Typography variant="h6">CANCEL</Typography>
                    </Button>
                  </div>
                </Box>
              </form>
            </Box>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default EmployeeEditForm;
