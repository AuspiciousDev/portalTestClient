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
import { DriveFileRenameOutline } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
const EmployeeEditForm = ({ data }) => {
  const { employees, dispatch } = useEmployeesContext();
  const [empID, setEmpID] = useState();
  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [suffix, setSuffix] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [placeOfBirth, setPlaceOfBirth] = useState();
  const [gender, setGender] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [nationality, setNationality] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [telephone, setTelephone] = useState();
  const [department, setDepartment] = useState();
  const [position, setPosition] = useState("");
  const [contactName, setContactName] = useState();
  const [relationship, setRelationship] = useState();
  const [emergencyNumber, setEmergencyNumber] = useState();

  const [empIDError, setEmpIDError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [middleNameError, setMiddleNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [suffixError, setSuffixError] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [placeOfBirthError, setPlaceOfBirthError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [civilStatusError, setCivilStatusError] = useState(false);
  const [nationalityError, setNationalityError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [provinceError, setProvinceError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [contactNameError, setContactNameError] = useState(false);
  const [relationshipError, setRelationshipError] = useState(false);
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
      setContactName(data.contactName);
      setRelationship(data.relationship);
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
      firstName,
      middleName,
      lastName,
      suffix,
      placeOfBirth,
      gender,
      dateOfBirth,
      civilStatus,
      nationality,
      address,
      city,
      province,
      email,
      mobile,
      telephone,
      department,
      position,
      contactName,
      relationship,
      emergencyNumber,
    };

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
    if (!contactName) {
      setContactNameError(true);
    } else {
      setContactNameError(false);
    }
    if (!relationship) {
      setRelationshipError(true);
    } else {
      setRelationshipError(false);
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
      !contactNameError &&
      !relationshipError &&
      !emergencyNumberError
    ) {
      const response = await fetch("/api/employees/update/" + empID, {
        method: "PATCH",
        body: JSON.stringify(employee),
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });

      if (response.ok) {
        dispatch({ type: "SET_EMPLOYEES", payload: null });

        const response2 = await fetch("/api/employees", {});
        const json = await response2.json();
        if (response2.ok) {
          dispatch({ type: "SET_EMPLOYEES", payload: json });
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
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">
            <Typography variant="h4" color="secondary">
              UPDATE EMPLOYEE DETAILS
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
                      error={contactNameError}
                      value={contactName}
                      onChange={(e) => {
                        setContactName(e.target.value);
                      }}
                    />
                    <TextField
                      variant="outlined"
                      label="Relationship"
                      error={relationshipError}
                      value={relationship}
                      onChange={(e) => {
                        setRelationship(e.target.value);
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
                      type="button"
                      variant="contained"
                      color="primary"
                      sx={{
                        width: "200px",
                        height: "50px",
                        marginLeft: "20px",
                      }}
                      onClick={() => {
                        close();
                      }}
                    >
                      <Typography color="white" variant="h6" fontWeight="500">
                        CANCEL
                      </Typography>
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="red"
                      sx={{
                        width: "200px",
                        height: "50px",
                        marginLeft: "20px",
                      }}
                    >
                      <Typography color="white" variant="h6" fontWeight="500">
                        Confirm
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
