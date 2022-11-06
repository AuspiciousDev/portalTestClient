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
  const [empID, setEmpID] = useState();
  const [department, setDepartment] = useState();
  const [position, setPosition] = useState();
  const [SubjectLoads, setSubjectLoads] = useState([]);
  const [LevelLoads, setLevelLoads] = useState([]);
  const [SectionLoads, setSectionLoads] = useState([]);
  const [active, setActive] = useState();
  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [suffix, setSuffix] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [placeOfBirth, setPlaceOfBirth] = useState();
  const [gender, setGender] = useState();
  const [civilStatus, setCivilStatus] = useState();
  const [nationality, setNationality] = useState();
  const [religion, setReligion] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [telephone, setTelephone] = useState();
  const [emergencyName, setEmergencyName] = useState();
  const [emergencyRelationship, setEmergencyRelationship] = useState();
  const [emergencyNumber, setEmergencyNumber] = useState();

  const [empIDError, setEmpIDError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [SubjectLoadsError, setSubjectLoadsError] = useState(false);
  const [LevelLoadsError, setLevelLoadsError] = useState(false);
  const [SectionLoadsError, setSectionLoadsError] = useState(false);
  const [activeError, setActiveError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [suffixError, setSuffixError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [placeOfBirthError, setPlaceOfBirthError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [civilStatusError, setCivilStatusError] = useState(false);
  const [nationalityError, setNationalityError] = useState(false);
  const [religionError, setReligionError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);
  const [emergencyNameError, setEmergencyNameError] = useState(false);
  const [emergencyRelationshipError, setEmergencyRelationshipError] =
    useState(false);
  const [emergencyNumberError, setEmergencyNumberError] = useState(false);
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
      setPlaceOfBirth(data.placeOfBirth);
      setGender(data.gender);
      setCivilStatus(data.civilStatus);
      setNationality(data.nationality);
      setAddress(data.address);
      setCity(data.city);
      setProvince(data.province);
      setEmail(data.email);
      setMobile(data.mobile);
      setTelephone(data.telephone);
      setDepartment(data.department);
      setPosition(data.position);
      setEmergencyName(data.contactName);
      setEmergencyRelationship(data.relationship);
      setEmergencyNumber(data.emergencyNumber);
    }
  };

  useEffect(() => {
    setUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employee = {
      empID,
      department,
      position,
      SubjectLoads,
      LevelLoads,
      SectionLoads,
      active,
      firstName,
      middleName,
      lastName,
      suffix,
      dateOfBirth,
      placeOfBirth,
      gender,
      civilStatus,
      nationality,
      religion,
      address,
      city,
      province,
      email,
      mobile,
      telephone,
      emergencyName,
      emergencyRelationship,
      emergencyNumber,
    };

    if (!empID) {
      setEmpIDError(true);
    } else {
      setEmpIDError(false);
    }
    if (!department) {
      setDepartmentError(true);
    } else {
      setDepartmentError(false);
    }
    if (!position) {
      setPositionError(true);
    } else {
      setPositionError(false);
    }
    if (!SubjectLoads) {
      setSubjectLoadsError(true);
    } else {
      setSubjectLoadsError(false);
    }
    if (!LevelLoads) {
      setLevelLoadsError(true);
    } else {
      setLevelLoadsError(false);
    }
    if (!SectionLoads) {
      setSectionLoadsError(true);
    } else {
      setSectionLoadsError(false);
    }
    if (!active) {
      setActiveError(true);
    } else {
      setActiveError(false);
    }
    if (!firstName) {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
    if (!middleName) {
      setMiddleNameError(true);
    } else {
      setMiddleNameError(false);
    }
    if (!lastName) {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }
    if (!suffix) {
      setSuffixError(true);
    } else {
      setSuffixError(false);
    }
    if (!dateOfBirth) {
      setDateOfBirthError(true);
    } else {
      setDateOfBirthError(false);
    }
    if (!placeOfBirth) {
      setPlaceOfBirthError(true);
    } else {
      setPlaceOfBirthError(false);
    }
    if (!gender) {
      setGenderError(true);
    } else {
      setGenderError(false);
    }
    if (!civilStatus) {
      setCivilStatusError(true);
    } else {
      setCivilStatusError(false);
    }
    if (!nationality) {
      setNationalityError(true);
    } else {
      setNationalityError(false);
    }
    if (!religion) {
      setReligionError(true);
    } else {
      setReligionError(false);
    }
    if (!address) {
      setAddressError(true);
    } else {
      setAddressError(false);
    }
    if (!city) {
      setCityError(true);
    } else {
      setCityError(false);
    }
    if (!province) {
      setProvinceError(true);
    } else {
      setProvinceError(false);
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
    if (!telephone) {
      setTelephoneError(true);
    } else {
      setTelephoneError(false);
    }
    if (!emergencyName) {
      setEmergencyNameError(true);
    } else {
      setEmergencyNameError(false);
    }
    if (!emergencyRelationship) {
      setEmergencyRelationshipError(true);
    } else {
      setEmergencyRelationshipError(false);
    }
    if (!emergencyNumber) {
      setEmergencyNumberError(true);
    } else {
      setEmergencyNumberError(false);
    }

    if (
      !empIDError &&
      !firstNameError &&
      !lastNameError &&
      !dateOfBirthError &&
      !placeOfBirthError &&
      !genderError &&
      !civilStatusError &&
      !nationalityError &&
      !addressError &&
      !cityError &&
      !provinceError &&
      !emailError &&
      !mobileError &&
      !departmentError &&
      !positionError &&
      !emergencyNameError &&
      !emergencyRelationshipError &&
      !emergencyNumberError
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
          <DriveFileRenameOutline style={{ color: colors.yellowAccent[500] }} />
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
            border: `solid 1px ${colors.gray[200]}`,
          }}
        >
          <button className="close" onClick={close}>
            &times;
          </button>
          <div
            className="header"
            style={{ backgroundColor: colors.primary[800] }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: colors.whiteOnly[100] }}
            >
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

                      <TextField
                        variant="outlined"
                        label="Place of Birth"
                        placeholder="City"
                        error={placeOfBirthError}
                        value={placeOfBirth}
                        onChange={(e) => {
                          setPlaceOfBirth(e.target.value);
                        }}
                      />

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
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Civil Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={civilStatus}
                          error={civilStatusError}
                          label="Civil Status"
                          onChange={(e) => {
                            setCivilStatus(e.target.value);
                          }}
                        >
                          <MenuItem value={"single"}>Single</MenuItem>
                          <MenuItem value={"married"}>Married</MenuItem>
                          <MenuItem value={"divorced"}>Divorced</MenuItem>
                          <MenuItem value={"widowed"}>Widowed</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        variant="outlined"
                        label="Nationality"
                        value={nationality}
                        onChange={(e) => {
                          setNationality(e.target.value);
                        }}
                        error={nationalityError}
                      />
                      <TextField variant="outlined" label="Religion" />
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
                      >
                        <TextField
                          variant="outlined"
                          label="Address"
                          error={addressError}
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                        <TextField
                          variant="outlined"
                          label="Municipality/City"
                          error={cityError}
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                        />
                        <TextField
                          variant="outlined"
                          label="Province/Region"
                          error={provinceError}
                          value={province}
                          onChange={(e) => {
                            setProvince(e.target.value);
                          }}
                        />
                      </Box>
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
                    <TextField
                      variant="outlined"
                      label="Department"
                      error={departmentError}
                      value={department}
                      onChange={(e) => {
                        setDepartment(e.target.value);
                      }}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Position
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={position}
                        error={positionError}
                        label="Position"
                        onChange={(e) => {
                          setPosition(e.target.value);
                        }}
                      >
                        <MenuItem value={"admin"}>Administrator</MenuItem>
                        <MenuItem value={"teacher"}>Teacher</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box marginBottom="40px">
                  <Typography variant="h5" sx={{ margin: "25px 0 10px 0" }}>
                    Emergency Information
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
                      label="Contact Name"
                      error={emergencyNameError}
                      value={emergencyName}
                      onChange={(e) => {
                        setEmergencyName(e.target.value);
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Relationship"
                      error={emergencyRelationshipError}
                      value={emergencyRelationship}
                      onChange={(e) => {
                        setEmergencyRelationship(e.target.value);
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Contact Number"
                      error={emergencyNumberError}
                      value={emergencyNumber}
                      onChange={(e) => {
                        setEmergencyNumber(e.target.value);
                      }}
                    />
                  </Box>
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
                      color="secButton"
                      sx={{
                        width: "200px",
                        height: "50px",
                        marginLeft: "20px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: colors.whiteOnly[100] }}
                      >
                        Confirm
                      </Typography>
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
                      <Typography
                        variant="h6"
                        sx={{ color: colors.whiteOnly[100] }}
                      >
                        CANCEL
                      </Typography>
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
